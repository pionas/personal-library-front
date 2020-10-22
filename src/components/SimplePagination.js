import { Button, Flex } from "@chakra-ui/core";
import React from "react";

export default function SimplePagination({ pageInfo, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber } = pageInfo;
    return (
        <Flex justifyContent="space-between" my="5">
            <Button
                disabled={!previousPageNumber}
                onClick={() => onPageChange(previousPageNumber)}
            >
                Previous Page
      </Button>
            <Button disabled>{currentPageNumber}</Button>
            <Button
                disabled={!nextPageNumber}
                onClick={() => onPageChange(nextPageNumber)}
            >
                Next Page
                </Button>
        </Flex>
    );
}
