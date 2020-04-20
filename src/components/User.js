import React from "react";
import { Flex, Heading, Avatar } from "@chakra-ui/core";

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
