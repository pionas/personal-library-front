import React from "react";
import { Stack } from "@chakra-ui/core";

export default function AdminActions({ children, ...remainingProps }) {
    if (!children) {
        return null;
    }
    return (
        <Stack m="3" p="3" bg="red.200" direction="row" {...remainingProps}>
            {children}
        </Stack>
    );
}
