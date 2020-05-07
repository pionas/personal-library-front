import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Flex, Box } from "@chakra-ui/core";
import Author from "../components/Author";
import Link from "../components/Link";

const GET_AUTHORS_QUERY = gql`
  query GetAuthors {
    authors {
      id
      name
      photo {
        url
      }
    }
  }
`;

export default function UsersPage() {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load authors...</p>;
  }
  const { authors } = data;
  return (
    <Box>
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
