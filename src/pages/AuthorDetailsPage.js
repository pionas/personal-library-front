import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/core";
import { useParams } from "react-router";
import AuthorDetails, {
  AUTHOR_DETAILS_FIELDS_FRAGMENT
} from "../components/AuthorDetails";

const GET_AUTHOR_QUERY = gql`
  query GetAuthor($authorId: ID!) {
    author(id: $authorId) {
      ...authorDetailsFields
    }
  }
  ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
`;

export default function AuthorDetailsPage() {
  const { authorId } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
    variables: { authorId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load books</p>;
  }
  const { author } = data;
  return (
    <Box>
      <AuthorDetails author={author} />
    </Box>
  );
}
