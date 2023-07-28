const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const gql = String.raw
const { v1: uuid } = require("uuid")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const config = require("./utils/config")
const mongoose = require("mongoose")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!

    authorCount: Int!

    allBooks(author: String, genre: String): [Book!]!

    allAuthors: [Author!]!

    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
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
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError(
          "You must be authenticated to edit authors",
          {
            extensions: { code: "UNAUTHENTICATED" },
          }
        )
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return updatedAuthor
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError(
          "You must be authenticated to add books",
          {
            extensions: { code: "UNAUTHENTICATED" },
          }
        )
      }

      const authors = await Author.find({})
      if (!authors.find((a) => a.name === args.author)) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          })
        }
      }
      const bookAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: bookAuthor._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return book.populate("author")
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "1234") {
        throw new GraphQLError("invalid credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const tokenParams = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(tokenParams, config.JWT_SECRET) }
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
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const encryptedToken = auth.replace("Bearer ", "")
      const decodedToken = jwt.verify(
        encryptedToken,
        config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
