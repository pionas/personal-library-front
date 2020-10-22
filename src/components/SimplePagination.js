import { Button, Flex } from "@chakra-ui/core";
import React from "react";

export default function SimplePagination({ pageInfo, resourcesLength, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, currentOffset, nextPageOffset, previousPageOffset } = pageInfo;
    const prevNumber = (previousPageNumber) ? previousPageNumber : (previousPageOffset !== null) ? previousPageOffset : null;
    const nextNumber = (nextPageNumber) ? nextPageNumber : (nextPageOffset) ? nextPageOffset : null;
    const currentNumber = (currentPageNumber) ? currentPageNumber + "" : (currentOffset !== null) ? (currentOffset + 1) + " - " + (currentOffset + resourcesLength) : null;
    return (
        <Flex justifyContent="space-between" my="5">
            <Button
                disabled={prevNumber === null || prevNumber < 0}
                onClick={() => onPageChange(prevNumber)}
            >
                Previous Page
      </Button>
            <Button disabled>{currentNumber}</Button>
            <Button
                disabled={!nextNumber}
                onClick={() => onPageChange(nextNumber)}
            >
                Next Page
                </Button>
        </Flex>
    );
}
