import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@chakra-ui/core";
import Book, { BOOK_FIELDS_FRAGMENT } from "../components/Book";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import Pagination from "../components/LoadMorePagination";
import { PAGE_INFO_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";

const GET_BOOKS_QUERY = gql`
  query GetBooks($searchQuery: String!, $pageNumber: Int = 1) {
    books(searchQuery: $searchQuery, pageSize: 3, pageNumber: $pageNumber) {
      results {
        ...bookFields
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${BOOK_FIELDS_FRAGMENT}
  ${PAGE_INFO_FIELDS_FRAGMENT}
`;

export default function BooksPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/books/search/"
  );
  const [tryLoading, setTryLoading] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS_QUERY, {
    variables: { searchQuery }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load books</p>;
  }
  const { books: { results: books, pageInfo } } = data;
  const hasBooks = books.length > 0;
  return (
    <Box w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {hasBooks ? (
        <>
          {books.map(book => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <Book {...book} />
            </Link>
          ))}

          {tryLoading ? (
            <Box display="flex" alignItems="center" justifyContent="space-between" bg="gray.200" pos="fixed" top="0" left="0" h="100%" w="100%" zIndex={2} opacity="0.3">
              <CircularProgress isIndeterminate color="black.200" size="120px" w="100%" />
            </Box>) : null}
          <Pagination
            queryName={"books"}
            pageInfo={pageInfo}
            fetchMore={fetchMore}
            setTryLoading={setTryLoading}
          />
        </>
      ) : (
          <p>No books found</p>
        )}
    </Box>
  );
}
