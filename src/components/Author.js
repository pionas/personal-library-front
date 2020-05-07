import React from "react";
import { Link } from "react-router-dom";
import { Flex, Heading, Image } from "@chakra-ui/core";
import { gql } from "@apollo/client";

export const AUTHOR_FIELDS_FRAGMENT = gql`
  fragment authorFields on Author {
    id
    name
    photo {
      url
    }
  }
`;

export default function Author({ author }) {
  return (
    <Flex
      m="3"
      mw="200px"
      border="1px"
      borderRadius="md"
      borderColor="gray.200"
      overflow="hidden"
      direction="column"
      align="center"
      bg="gray.50"
    >
      <Image size="200px" objectFit="cover" src={author.photo.url} />
      <Heading as="h2" size="md" color="gray.700" my="3">
        <Link to={`/authors/${author.id}`}>{author.name}</Link>
      </Heading>
    </Flex>
  );
}
