const Book = require("./models/book")
const Author = require("./models/author")
const { GraphQLError } = require("graphql/index")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const config = require("./utils/config")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

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
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.map((book) => book.genres)
      return [...new Set(genres.flat(1))] // flattens array then removes duplicate genres
    },
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("You must be authenticated to edit authors", {
          extensions: { code: "UNAUTHENTICATED" },
        })
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
        throw new GraphQLError("You must be authenticated to add books", {
          extensions: { code: "UNAUTHENTICATED" },
        })
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

      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
