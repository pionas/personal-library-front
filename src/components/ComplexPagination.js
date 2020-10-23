import { Button, Flex } from "@chakra-ui/core";
import React from "react";

export default function ComplexPagination({ pageInfo, resourcesLength, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, currentPageOffset, nextPageOffset, previousPageOffset, firstPageNumber, lastPageNumber, firstPageOffset, lastPageOffset } = pageInfo;
    const firstNumber = (firstPageNumber) ? firstPageNumber : firstPageOffset;
    const firstNumberDisabled = (firstPageNumber) ? (firstPageNumber === currentPageNumber) : (firstPageOffset === currentPageOffset);
    const lastNumber = (lastPageNumber) ? lastPageNumber : lastPageOffset;
    const lastNumberDisabled = (lastPageNumber) ? (lastPageNumber === currentPageNumber) : (lastPageOffset === currentPageOffset);
    const prevNumber = (previousPageNumber) ? previousPageNumber : (previousPageOffset !== null) ? previousPageOffset : null;
    const nextNumber = (nextPageNumber) ? nextPageNumber : (nextPageOffset) ? nextPageOffset : null;
    const currentNumber = (currentPageNumber) ? currentPageNumber + "" : (currentPageOffset !== null) ? (currentPageOffset + 1) + " - " + (currentPageOffset + resourcesLength) : null;
    return (
        <Flex justifyContent="space-between" my="5">
            <Button
                disabled={firstNumberDisabled}
                onClick={() => onPageChange(firstNumber)}
            >
                First Page
      </Button>

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

            <Button
                disabled={lastNumberDisabled}
                onClick={() => onPageChange(lastNumber)}
            >
                Last Page
      </Button>
        </Flex>
    );
}
