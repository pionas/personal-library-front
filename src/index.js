import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/core";

import App from "./App";
import AuthProvider, { getAuthToken } from "./components/AuthProvider";

const GRAPHQL_ENDPOINT = "https://ancient-badlands-11449.herokuapp.com/";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
  possibleTypes: {
    Anything: ["Book", "Author", "User", "BookCopy"],
    Resource: ["Book", "Author", "User", "BookCopy"]
  }
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthToken();
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,

});
const client = new ApolloClient({
  link: concat(authLink, httpLink),
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
