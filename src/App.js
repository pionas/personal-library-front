import React from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UsersPage from "./pages/UsersPage";
import RandomPage from "./pages/RandomPage";
import { Flex, Box, Divider, Heading, Link } from "@chakra-ui/core";

export default function App() {
  return (
    <Flex
      direction="column"
      align="center"
      width={["100%", "75%", "60%"]}
      mx="auto"
    >
      <Flex
        direction={["column", null, "row"]}
        align="center"
        justifyContent="space-between"
        w="100%"
        mx="5"
      >
        <Link to="/" as={RouterLink}>
          <Heading as="h1">Personal Library</Heading>
        </Link>
        <Box d="flex">
          <Link to="/" as={RouterLink}>
            <h1>Books</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/authors" as={RouterLink}>
            <h1>Authors</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/users" as={RouterLink}>
            <h1>Users</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/random" as={RouterLink}>
            <h1>Random</h1>
          </Link>
        </Box>
      </Flex>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="authors/" element={<AuthorsPage />} />
        <Route path="users/" element={<UsersPage />} />
        <Route path="random/" element={<RandomPage />} />
        <Route path="authors/:name" element={<AuthorDetailsPage />} />
      </Routes>
    </Flex>
  );
}
