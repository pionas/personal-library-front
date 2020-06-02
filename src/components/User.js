import React from "react";
import { Flex, Heading } from "@chakra-ui/core";
import { gql } from "@apollo/client";
import Avatar, { AVATAR_FIELDS_FRAGMENT } from "./Avatar";

export const USER_FIELDS_FRAGMENT = gql`
  fragment userFields on User {
    id
    name
    avatar {
      ...avatarFields
    }
  }
  ${AVATAR_FIELDS_FRAGMENT}
`;

export default function User({ user }) {
  return (
    <Flex alignItems="center" direction="column" w="100%" mt="5">
      <Avatar size="xl" avatar={user.avatar} />
      <Heading mx="4" color="gray.700">
        {user.name}
      </Heading>
    </Flex>
  );
}
