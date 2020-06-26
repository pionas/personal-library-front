import React from "react";
import { Button } from "@chakra-ui/core";
import { useToast } from "./Toast";

export default function UserDeleteButton({ userId, ...remainingProps }) {
    const toast = useToast();
    return (
        <Button
            onClick={() =>
                toast({ status: "warning", description: "NOT IMPLEMENTED" })
            }
            isLoading={false}
            {...remainingProps}
        >
            Delete user
        </Button>
    );
}
