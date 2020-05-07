import React from "react";
import { Routes, Route } from "react-router-dom";

import { Flex, Box, Divider, Heading } from "@chakra-ui/core";
import Link from "./components/Link";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import RandomPage from "./pages/RandomPage";
import AnythingDetailsPage from "./pages/AnythingDetailsPage";
import EverythingPage from "./pages/EverythingPage";
import BookDetailsPage from "./pages/BookDetailsPage";

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
        <Link to="/">
          <Heading as="h1">Personal Library</Heading>
        </Link>
        <Box d="flex">
          <Link to="/">
            <h1>Books</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/authors">
            <h1>Authors</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/users">
            <h1>Users</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/random">
            <h1>Random</h1>
          </Link>
        </Box>
      </Flex>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route path="authors/" element={<AuthorsPage />} />
        <Route path="users/" element={<UsersPage />} />
        <Route path="users/:userId" element={<UserDetailsPage />} />
        <Route path="random/" element={<RandomPage />} />
        <Route path="authors/:authorId" element={<AuthorDetailsPage />} />
        <Route path="admin/anything/:anyId" element={<AnythingDetailsPage />} />
        <Route path="admin/everything" element={<EverythingPage />} />
      </Routes>
    </Flex>
  );
}
