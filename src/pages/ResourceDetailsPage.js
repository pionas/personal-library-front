import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/core";
import { useParams } from "react-router";
import ResourceDetails, {
  RESOURCE_DETAILS_FIELDS_FRAGMENT
} from "../components/ResourceDetails";

const GET_RESOURCE_QUERY = gql`
  query GetResource($anyId: ID!) {
    resource(id: $anyId) {
      ...resourceDetailsFields
    }
  }
  ${RESOURCE_DETAILS_FIELDS_FRAGMENT}
`;

export default function ResourceDetailsPage() {
  const { anyId } = useParams();
  const { loading, error, data } = useQuery(GET_RESOURCE_QUERY, {
    variables: { anyId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load record</p>;
  }

  const { resource } = data;

  return (
    <Box bg="red.100">
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      <ResourceDetails resource={resource} />
    </Box>
  );
}
