import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";

export default function SimplePagination({ pageInfo, resourcesLength, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, currentPageOffset, nextPageOffset, previousPageOffset } = pageInfo;
    const prevNumber = (previousPageNumber) ? previousPageNumber : (previousPageOffset !== null) ? previousPageOffset : null;
    const nextNumber = (nextPageNumber) ? nextPageNumber : (nextPageOffset) ? nextPageOffset : null;
    const currentNumber = (currentPageNumber) ? currentPageNumber + "" : (currentPageOffset !== null) ? (currentPageOffset + 1) + " - " + (currentPageOffset + resourcesLength) : null;

    const commonPageButtonProps = { currentNumber, onPageChange };

    return (
        <Flex justifyContent="space-between" my="5">
            <PageButton
                disabled={prevNumber === null || prevNumber < 0}
                newPageNumber={prevNumber} {...commonPageButtonProps}>
                Previous Page
            </PageButton>

            <PageButton
                disabled={true}
                newPageNumber={currentNumber} {...commonPageButtonProps} />

            <PageButton
                disabled={!nextNumber}
                newPageNumber={nextNumber} {...commonPageButtonProps}>
                Next Page
                </PageButton>

        </Flex>
    );
}
