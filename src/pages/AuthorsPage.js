import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Flex, Box } from "@chakra-ui/core";
import Author from "../components/Author";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";

const GET_AUTHORS_QUERY = gql`
  query GetAuthors($searchQuery: String!) {
    authors(searchQuery: $searchQuery) {
      id
      name
      photo {
        url
      }
    }
  }
`;

export default function UsersPage() {
  const [searchQueryDecode, handleSearchQueryChange] = useSearchQuery("/authors/search/");

  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY, {
    variables: { searchQuery: searchQueryDecode }
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
    <Box>
      <SearchBox searchQuery={searchQueryDecode} onSearchQueryChange={handleSearchQueryChange} />
      <Flex wrap="wrap" justify="space-around">
        {hasAuthors ? authors.map(author => (
          <Link key={author.id} to={`/authors/${author.id}`}>
            <Author author={author} />
          </Link>
        )) : <p>No authors found</p>}
      </Flex>
    </Box>
  );
}
