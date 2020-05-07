import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/core";
import Book, { BOOK_FIELDS_FRAGMENT } from "../components/Book";
import Link from "../components/Link";

const GET_BOOKS_QUERY = gql`
  query GetBooks {
    books {
      ...bookFields
    }
  }
  ${BOOK_FIELDS_FRAGMENT}
`;

export default function BooksPage() {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load books</p>;
  }
  const { books } = data;
  return (
    <Box w="100%">
      {books.map(book => (
        <Link key={book.id} to={`/books/${book.id}`}>
          <Book {...book} />
        </Link>
      ))}
    </Box>
  );
}
