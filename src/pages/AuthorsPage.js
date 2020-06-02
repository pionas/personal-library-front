import React from "react";
import { gql, useQuery } from "@apollo/client";
import Author, { AUTHORS_FIELDS_FRAGMENT } from "../components/Author";
import { Flex, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";

const GET_AUTHORS_QUERY = gql`
  query GetAuthors($searchQuery: String!) {
    authors(searchQuery: $searchQuery) {
      ...authorFields
    }
  }
  ${AUTHORS_FIELDS_FRAGMENT}
`;

export default function UsersPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/authors/search/"
  );
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY, {
    variables: { searchQuery }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load authors...</p>;
  }
  const { authors } = data;
  return (
    <Box>
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <Flex wrap="wrap" justify="space-around">
        {authors.map(author => (
          <Link key={author.id} to={`/authors/${author.id}`}>
            <Author author={author} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
