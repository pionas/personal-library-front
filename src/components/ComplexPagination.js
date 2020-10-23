import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";

export default function ComplexPagination({ pageInfo, resourcesLength, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, currentPageOffset, nextPageOffset, previousPageOffset, firstPageNumber, lastPageNumber, firstPageOffset, lastPageOffset } = pageInfo;
    const firstNumber = (firstPageNumber) ? firstPageNumber : (firstPageOffset !== null) ? firstPageOffset : null;
    const lastNumber = (lastPageNumber) ? lastPageNumber : (lastPageOffset !== null) ? lastPageOffset : null;
    const prevNumber = (previousPageNumber) ? previousPageNumber : (previousPageOffset !== null) ? previousPageOffset : null;
    const nextNumber = (nextPageNumber) ? nextPageNumber : (nextPageOffset) ? nextPageOffset : null;
    const currentNumber = (currentPageNumber) ? currentPageNumber : (currentPageOffset !== null) ? currentPageOffset : null;
    const currentNumberText = (currentPageNumber) ? currentPageNumber + "" : (currentPageOffset !== null) ? (currentPageOffset + 1) + " - " + (currentPageOffset + resourcesLength) : null;

    const commonPageButtonProps = { currentNumber, onPageChange };
    return (
        <Flex justifyContent="space-between" my="5">
            <PageButton
                disabled={firstNumber === null || firstNumber < 0 || firstNumber === currentNumber}
                newPageNumber={firstNumber} {...commonPageButtonProps}>
                First Page
            </PageButton>
            <PageButton
                disabled={prevNumber === null || prevNumber < 0}
                newPageNumber={prevNumber} {...commonPageButtonProps}>
                Previous Page
            </PageButton>
            <PageButton
                disabled={true}
                newPageNumber={currentNumber} {...commonPageButtonProps}>
                {currentNumberText}
            </PageButton>
            <PageButton
                disabled={!nextNumber}
                newPageNumber={nextNumber} {...commonPageButtonProps}>
                Next Page
            </PageButton>
            <PageButton
                disabled={!lastNumber || lastNumber === currentNumber}
                newPageNumber={lastNumber} {...commonPageButtonProps}>
                Last Page
            </PageButton>
        </Flex>
    );
}
