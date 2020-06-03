import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/core";
import NormalizedResource, {
  normalizeResource,
  NORMALIZED_RESOURCE_FRAGMENT
} from "../components/NormalizedResource";
import Link from "../components/Link";

const GET_RESOURCES_QUERY = gql`
  query GetResources {
    resources {
      ...normalizedResourceFields
    }
  }
  ${NORMALIZED_RESOURCE_FRAGMENT}
`;

export default function ResourcesPage() {
  const { loading, error, data } = useQuery(GET_RESOURCES_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load resource</p>;
  }

  const { resources } = data;
  const normalizedResources = resources.map(normalizeResource);
  return (
    <Box w="100%" bg="red.100" p={5}>
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      {normalizedResources.map(normalizedResource => (
        <Link
          to={`/admin/resource/${normalizedResource.id}`}
          key={normalizedResource.id}
        >
          <NormalizedResource normalizedResource={normalizedResource} />
        </Link>
      ))}
    </Box>
  );
}
