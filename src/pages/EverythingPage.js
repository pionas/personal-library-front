import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/core";
import NormalizedAnything, {
  normalizeAnything,
  NORMALIZED_ANYTHING_FRAGMENT
} from "../components/NormalizedAnything";
import Link from "../components/Link";

const GET_EVERYTHING_QUERY = gql`
  query GetEverything {
    everything {
      ...normalizedAnything
    }
  }
  ${NORMALIZED_ANYTHING_FRAGMENT}
`;

export default function EverythingPage() {
  const { loading, error, data } = useQuery(GET_EVERYTHING_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load record</p>;
  }

  const { everything } = data;
  const normalizedEverything = everything.map(normalizeAnything);
  return (
    <Box w="100%" bg="red.100" p={5}>
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      {normalizedEverything.map(normalizedAnything => (
        <Link
          to={`/admin/anything/${normalizedAnything.id}`}
          key={normalizedAnything.id}
        >
          <NormalizedAnything normalizedAnything={normalizedAnything} />
        </Link>
      ))}
    </Box>
  );
}
