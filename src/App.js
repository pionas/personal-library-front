import React from "react";
import { Routes, Route } from "react-router-dom";

import { Flex } from "@chakra-ui/core";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import NewAuthorPage from "./pages/NewAuthorPage";
import EditAuthorPage from "./pages/EditAuthorPage";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import NewUserPage from "./pages/NewUserPage";
import EditUserPage from "./pages/EditUserPage";
import RandomPage from "./pages/RandomPage";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import ResourcesPage from "./pages/ResourcesPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import Header from "./components/Header";
import CurrentUserDetailsPage from "./pages/CurrentUserDetailsPage";

export default function App() {
  return (
    <Flex
      direction="column"
      align="center"
      width={["100%", "75%", "60%"]}
      mx="auto"
    >
      <Header />
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route path="books/search/:searchQuery" element={<BooksPage />} />
        <Route path="books/search/" element={<BooksPage />} />
        <Route path="users/" element={<UsersPage />} />
        <Route path="users/:userId" element={<UserDetailsPage />} />
        <Route path="users/:userId/edit" element={<EditUserPage />} />
        <Route path="users/new" element={<NewUserPage />} />
        <Route path="users/search/:searchQuery" element={<UsersPage />} />
        <Route path="users/search/" element={<UsersPage />} />
        <Route path="me/" element={<CurrentUserDetailsPage />} />
        <Route path="random/" element={<RandomPage />} />
        <Route path="authors/" element={<AuthorsPage />} />
        <Route path="authors/:authorId" element={<AuthorDetailsPage />} />
        <Route path="authors/:authorId/edit" element={<EditAuthorPage />} />
        <Route path="authors/new" element={<NewAuthorPage />} />
        <Route path="authors/search/:searchQuery" element={<AuthorsPage />} />
        <Route path="authors/search/" element={<AuthorsPage />} />
        <Route path="admin/resource/:anyId" element={<ResourceDetailsPage />} />
        <Route path="admin/resources" element={<ResourcesPage />} />
      </Routes>
    </Flex>
  );
}
