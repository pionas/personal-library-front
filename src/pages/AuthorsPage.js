import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Author, { AUTHOR_FIELDS_FRAGMENT } from "../components/Author";
import { SimpleGrid, Stack } from "@chakra-ui/core";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import AdminActions from "../components/AdminActions";
import ResetDataButton from "../components/ResetDataButton";
import AuthorDeleteButton from "../components/AuthorDeleteButton";
import ButtonLink from "../components/ButtonLink";
import SimplePagination from "../components/SimplePagination";

export const ALL_AUTHORS_QUERY = gql`
  query AllAuthors($searchQuery: String!, $pageNumber: Int = 1) {
    authors(searchQuery: $searchQuery, pageSize: 6, pageNumber: $pageNumber) {
      ...authorFields
    }
  }
  ${AUTHOR_FIELDS_FRAGMENT}
`;

export default function AuthorsPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/authors/search/"
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { loading, error, data } = useQuery(ALL_AUTHORS_QUERY, {
    variables: { searchQuery, pageNumber: currentPageNumber }
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load authors...</p>;
  }
  const { authors } = data;
  const hasAuthors = authors.length > 0;
  return (
    <Stack w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {hasAuthors ? (
        <>
          <SimpleGrid columns={[1, 2, 3, 4]}>
            {authors.map(author => (
              <Stack key={author.id}>
                <Link to={`/authors/${author.id}`}>
                  <Author author={author} />
                </Link>
                <AdminActions direction="column">
                  <ButtonLink to={`/authors/${author.id}/edit`}>Edit author</ButtonLink>
                  <AuthorDeleteButton authorId={author.id} />
                </AdminActions>
              </Stack>
            ))}
          </SimpleGrid>
          <SimplePagination
            pageNumber={currentPageNumber}
            onPageChange={(pageNumber) => {
              setCurrentPageNumber(pageNumber);
            }}
          />
        </>
      ) : (
          <p>No authors found</p>
        )}
      <AdminActions>
        <ButtonLink to={"/authors/new"}>Create new Author</ButtonLink>
        <ResetDataButton />
      </AdminActions>
    </Stack>
  );
}
