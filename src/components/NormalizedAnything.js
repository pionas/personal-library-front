import React from "react";
import { Stack, Image, Heading, Box } from "@chakra-ui/core";

const COLORS_BY_TYPENAME = {
  Book: "red.200",
  Author: "green.200",
  User: "blue.200"
};

function NormalizedAnything({ normalizedAnything }) {
  return (
    <Stack
      w="100%"
      my={3}
      bg={COLORS_BY_TYPENAME[normalizedAnything.__typename]}
      p={3}
      overflow="hidden"
      rounded={5}
    >
      <Stack isInline>
        <Image
          size="100px"
          rounded={5}
          objectFit="cover"
          src={normalizedAnything.img && normalizedAnything.img.url}
        />
        <Stack>
          <Heading as="h4" size="sm">
            {normalizedAnything.__typename}
          </Heading>
          <Heading as="h3" size="md">
            {normalizedAnything.name}
          </Heading>
          <Box
            as="article"
            w="300px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {normalizedAnything.info}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NormalizedAnything;
