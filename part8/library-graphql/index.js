const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const gql = String.raw
const { v1: uuid } = require("uuid")
const Book = require("./models/book")
const Author = require("./models/author")

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

    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (b) => b.author === args.author
        )
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        )
      }
      return filteredBooks
    },
    allAuthors: () => authors,
  },
  Mutation: {
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) =>
        a.name === args.name ? updatedAuthor : a
      )
      return updatedAuthor
    },
    addBook: (root, args) => {
      if (!authors.find((a) => a.name === args.author)) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
  },
  Author: {
    bookCount: (root) => {
      return books.filter((b) => b.author === root.name).length
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
