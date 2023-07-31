const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

const User = require("./models/user")
const config = require("./utils/config")
const typeDefs = require("./schema")
const resolvers = require("./resolver")

console.log(`Connecting to ${config.MONGODB_URI}`)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Successfully connected"))
  .catch((err) => console.log("Connection failed:", err.message))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const encryptedToken = auth.replace("Bearer ", "")
          const decodedToken = jwt.verify(encryptedToken, config.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  httpServer.listen(config.PORT, () =>
    console.log(`Server is ready at localhost:${config.PORT}`)
  )
}

start()
