import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/core";
import Book from "../components/Book";

const GET_ALL_BOOKS_QUERY = gql`
  query GetAllBooks {
    books {
      title
      cover {
        url
      }
      author {
        name
      }
    }
  }
`;

export default function BooksPage() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load books</p>;
  }
  const { books } = data;
  return (
    <Box>
      {books.map(book => (
        <Book key={book.title} {...book} />
      ))}
    </Box>
  );
}
