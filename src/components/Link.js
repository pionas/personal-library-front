import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/core";

export default function Link(props) {
  return <ChakraLink as={RouterLink} {...props} />;
}
