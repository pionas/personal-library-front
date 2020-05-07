import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/core";
import { gql } from "@apollo/client";

export const BOOK_FIELDS_FRAGMENT = gql`
  fragment bookFields on Book {
    id
    title
    cover {
      url
    }
    author {
      name
    }
  }
`;
export default function Book({ id, title, cover, author }) {
  return (
    <Flex
      mt="5"
      w="100%"
      border="1px"
      borderRadius="md"
      borderColor="gray.200"
      overflow="hidden"
      bg="gray.50"
    >
      <Image size="100px" objectFit="cover" src={cover.url} />
      <Flex direction="column" mx="2" justify="center">
        <Heading as="h3" size="md" color="gray.700">
          {title}
        </Heading>
        <Heading as="h4" size="sm" color="gray.400">
          {author.name}
        </Heading>
      </Flex>
    </Flex>
  );
}
