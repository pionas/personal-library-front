import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Stack, Text } from "@chakra-ui/core";
import Book, { BOOK_FIELDS_FRAGMENT } from "../components/Book";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import SimplePagination from "../components/SimplePagination";
import { PAGE_INFO_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";

const GET_BOOKS_QUERY = gql`
  query GetBooks($searchQuery: String!, $pageNumber: Int = 1) {
    paginatedBooks(searchQuery: $searchQuery, pageSize: 3, pageNumber: $pageNumber) {
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
  const { paginatedBooks } = data;
  const { results: books, pageInfo } = paginatedBooks;
  const hasBooks = books.length > 0;
  return (
    <Box w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {tryLoading ? (
        <Stack m="0" p="3" bg="red.200" direction="row">
          <Text>Loading...</Text>
        </Stack>) : null}
      {hasBooks ? (
        <>
          {books.map(book => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <Book {...book} />
            </Link>
          ))}
          <SimplePagination
            pageInfo={pageInfo}
            onPageChange={(pageNumber) => {
              setTryLoading(true);
              fetchMore({
                variables: { pageNumber },
                updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                  setTryLoading(false);
                  if (!fetchMoreResult) {
                    return previousQueryResult;
                  }
                  return fetchMoreResult;
                }
              });
            }}
          />
        </>
      ) : (
          <p>No books found</p>
        )}
    </Box>
  );
}
