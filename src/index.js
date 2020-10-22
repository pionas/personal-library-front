import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/core";

import App from "./App";
import AuthProvider, { getAuthToken } from "./components/AuthProvider";

const GRAPHQL_ENDPOINT = "https://ancient-badlands-11449.herokuapp.com/";
const token = getAuthToken();

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
  possibleTypes: {
    Anything: ["Book", "Author", "User", "BookCopy"],
    Resource: ["Book", "Author", "User", "BookCopy"]
  }
});
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    Authorization: token ? `Bearer ${token}` : null
  },
  cache
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  rootElement
);
