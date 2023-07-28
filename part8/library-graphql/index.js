const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const gql = String.raw
const { v1: uuid } = require("uuid")
const Book = require("./models/book")
const Author = require("./models/author")
const config = require("./utils/config")
const mongoose = require("mongoose")

console.log(`Connecting to ${config.MONGODB_URI}`)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Successfully connected"))
  .catch((err) => console.log("Connection failed:", err.message))

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author._id
      }
      if (args.genre) {
        filter["genres"] = args.genre
      }
      const books = await Book.find(filter).populate("author")
      return books
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    editAuthor: async (root, args) => {
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return updatedAuthor
    },
    addBook: async (root, args) => {
      const authors = await Author.find({})
      if (!authors.find((a) => a.name === args.author)) {
        const author = new Author({ name: args.author })
        await author.save()
      }
      const bookAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: bookAuthor._id })
      await book.save()
      return book.populate("author")
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
