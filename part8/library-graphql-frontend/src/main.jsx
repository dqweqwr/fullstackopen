import App from "./App.jsx"
import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)
