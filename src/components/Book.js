import React from "react";
import { Link } from "react-router-dom";
import { Flex, Heading, Image } from "@chakra-ui/core";
const slugHelper = require("../functions/SlugHelper");

export default function Book({ id, title, cover, author }) {
  let slug;
  if (typeof author !== "undefined") {
    slug = slugHelper.slug(author.name);
  }
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
        {typeof author !== "undefined" && (
          <Heading as="h4" size="sm" color="gray.400">
            <Link to={`/authors/${slug}`}>{author.name}</Link>
          </Heading>
        )}
      </Flex>
    </Flex>
  );
}
