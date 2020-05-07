import React from "react";
import { gql } from "@apollo/client";
import { Flex, Heading, Image, Box } from "@chakra-ui/core";
import Link from "./Link";
import Book from "./Book";

export const AUTHOR_DETAILS_FIELDS_FRAGMENT = gql`
  fragment authorDetailsFields on Author {
    id
    name
    bio
    photo {
      url
    }
    books {
      id
      title
      cover {
        url
      }
      author {
        name
      }
    }
  }
`;
export default function AuthorDetails({ author }) {
  return (
    <Flex m="3" overflow="hidden" direction="column" align="center">
      <Heading as="h2" size="lg" color="gray.700" my="3">
        {author.name}
      </Heading>
      <Box as="article">
        <Image
          w="40%"
          objectFit="cover"
          src={author.photo.url}
          float="left"
          mr="3"
        />
        <Box as="article">{author.bio}</Box>
      </Box>
      <Heading as="h3" size="sm">
        Books
      </Heading>
      {author.books.map(book => (
        <Link to={`/books/${book.id}`} key={book.id} w="100%">
          <Book {...book} author={author} />
        </Link>
      ))}
    </Flex>
  );
}
