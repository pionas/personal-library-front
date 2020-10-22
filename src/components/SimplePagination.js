import { Button, Flex } from "@chakra-ui/core";
import React from "react";

export default function SimplePagination({ pageNumber, onPageChange }) {
    const previousPageNumber = (pageNumber < 2) ? pageNumber : pageNumber - 1;
    const nextPageNumber = pageNumber + 1;
    return (
        <Flex justifyContent="space-between" my="5">
            <Button onClick={() => onPageChange(previousPageNumber)}>
                Previous Page
      </Button>
            <Button disabled>{pageNumber}</Button>
            <Button onClick={() => onPageChange(nextPageNumber)}>Next Page</Button>
        </Flex>
    );
}
