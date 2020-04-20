import React from "react";
import { Flex, Heading, Image, Box } from "@chakra-ui/core";
import Book from "./Book";

export default function AuthorDetails({ author }) {
  return (
    <Flex direction="column" align="center" bg="gray.50">
      <Image size="200px" objectFit="cover" src={author.photo.url} />
      <Heading as="h2" size="md" color="gray.700" my="3">
        {author.name}
      </Heading>
      <Box>
        {author.books.map(book => (
          <Book key={book.title} {...book} />
        ))}
      </Box>
    </Flex>
  );
}
