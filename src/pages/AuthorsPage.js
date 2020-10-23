import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Author, { AUTHOR_FIELDS_FRAGMENT } from "../components/Author";
import { CircularProgress, SimpleGrid, Stack, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import AdminActions from "../components/AdminActions";
import ResetDataButton from "../components/ResetDataButton";
import AuthorDeleteButton from "../components/AuthorDeleteButton";
import ButtonLink from "../components/ButtonLink";
import Pagination from "../components/SimplePagination";
import { PAGE_INFO_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";

export const ALL_AUTHORS_QUERY = gql`
  query AllAuthors($searchQuery: String!, $pageNumber: Int = 1) {
    authors(searchQuery: $searchQuery, pageSize: 4, pageNumber: $pageNumber) {
      results {
        ...authorFields
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${AUTHOR_FIELDS_FRAGMENT}
  ${PAGE_INFO_FIELDS_FRAGMENT}
`;

export default function AuthorsPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/authors/search/"
  );
  const [tryLoading, setTryLoading] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(ALL_AUTHORS_QUERY, {
    variables: { searchQuery }
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load authors...</p>;
  }
  const { authors: { results: authors, pageInfo } } = data;
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
          {tryLoading ? (
            <Box display="flex" alignItems="center" justifyContent="space-between" bg="gray.200" pos="fixed" top="0" left="0" h="100%" w="100%" zIndex={2} opacity="0.3">
              <CircularProgress isIndeterminate color="black.200" size="120px" w="100%" />
            </Box>) : null}
          <Pagination
            queryName={"authors"}
            pageInfo={pageInfo}
            fetchMore={fetchMore}
            setTryLoading={setTryLoading}
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
