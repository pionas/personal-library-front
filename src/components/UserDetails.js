import React from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/core";
import { gql } from "@apollo/client";
import Avatar, { AVATAR_FIELDS_FRAGMENT } from "./Avatar";

export const USER_DETAILS_FIELDS_FRAGMENT = gql`
  fragment userDetailsFields on User {
    id
    name
    info
    avatar {
      ...avatarFields
    }
  }
  ${AVATAR_FIELDS_FRAGMENT}
`;

export default function User({ user }) {
  return (
    <Box>
      <Flex alignItems="center">
        <Flex alignItems="center" direction="column" w="100%" mt="5">
          <Avatar size="xl" avatar={user.avatar} />
          <Heading mx="4" color="gray.700">
            {`${user.name} <${user.email}>`}
          </Heading>
          <Text as="strong">
            {user.isAdmin ? "You are an admin" : "You are not an admin"}
          </Text>
        </Flex>
        <Box as="article">{user.info}</Box>
      </Flex>
    </Box>
  );
}
