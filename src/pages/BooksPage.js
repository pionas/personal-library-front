import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/core";
import Book, { BOOK_FIELDS_FRAGMENT } from "../components/Book";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import SimplePagination from "../components/SimplePagination";

const GET_BOOKS_QUERY = gql`
  query GetBooks($searchQuery: String!, $pageNumber: Int = 1) {
    books(searchQuery: $searchQuery, pageSize: 3, pageNumber: $pageNumber) {
      ...bookFields
    }
  }
  ${BOOK_FIELDS_FRAGMENT}
`;

export default function BooksPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/books/search/"
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS_QUERY, {
    variables: { searchQuery }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load books</p>;
  }
  const { books } = data;
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
          <SimplePagination
            pageNumber={currentPageNumber}
            onPageChange={(pageNumber) => {
              fetchMore({
                variables: { pageNumber },
                updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return previousQueryResult;
                  }
                  return fetchMoreResult;
                }
              });
              setCurrentPageNumber(pageNumber);
            }}
          />
        </>
      ) : (
          <p>No books found</p>
        )}
    </Box>
  );
}
