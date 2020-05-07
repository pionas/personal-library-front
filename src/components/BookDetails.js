import React from "react";
import { Flex, Heading, Image, Box } from "@chakra-ui/core";
import Link from "./Link";
import { gql } from "@apollo/client";

export const BOOK_DETAILS_FIELDS_FRAGMENT = gql`
  fragment bookDetailsFields on Book {
    id
    title
    description
    cover {
      url
    }
    author {
      id
      name
    }
  }
`;
export default function BookDetails({ book }) {
  return (
    <Flex m="3" direction="column" align="center">
      <Heading as="h2" size="lg" color="gray.700" my="3">
        {book.title}
      </Heading>

      <Box as="article">
        <Image
          src={book.cover.url}
          objectFit="cover"
          width="40%"
          float="left"
          mr="3"
        />
        <Heading as="h4" size="sm">
          Written by{" "}
          <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
        </Heading>
        <Box as="article">{book.description}</Box>
      </Box>
    </Flex>
  );
}
