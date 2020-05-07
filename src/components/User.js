import React from "react";
import { Flex, Heading, Avatar } from "@chakra-ui/core";
import { gql } from "@apollo/client";

export const USER_FIELDS_FRAGMENT = gql`
  fragment userFields on User {
    id
    name
    avatar {
      image {
        url
      }
      color
    }
  }
`;

export default function User({ user }) {
  return (
    <Flex alignItems="center" direction="column" w="100%" mt="5">
      <Avatar
        size="xl"
        src={user.avatar.image.url}
        background={user.avatar.color}
      />
      <Heading mx="4" color="gray.700">
        {user.name}
      </Heading>
    </Flex>
  );
}
