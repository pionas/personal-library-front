import { Button, Flex } from "@chakra-ui/core";
import React from "react";

export default function SimplePagination({ pageNumber, onPageChange }) {
    const previousPageNumber = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPageNumber = pageNumber + 1;
    return (
        <Flex justifyContent="space-between" my="5">
            <Button
                disabled={!previousPageNumber}
                onClick={() => onPageChange(previousPageNumber)}
            >
                Previous Page
      </Button>
            <Button disabled>{pageNumber}</Button>
            <Button onClick={() => onPageChange(nextPageNumber)}>Next Page</Button>
        </Flex>
    );
}
