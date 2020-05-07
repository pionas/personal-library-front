import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/core";
import { useParams } from "react-router";
import AnythingDetails from "../components/AnythingDetails";

const GET_ANYTHING_QUERY = gql`
  query GetAnything($anyId: ID!) {
    anything(id: $anyId) {
      __typename
    }
  }
`;

export default function AnythingDetailsPage() {
  const { anyId } = useParams();
  const { loading, error, data } = useQuery(GET_ANYTHING_QUERY, {
    variables: { anyId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load record</p>;
  }

  const { anything } = data;

  return (
    <Box w="100%" bg="red.100">
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      <AnythingDetails anything={anything} />
    </Box>
  );
}
