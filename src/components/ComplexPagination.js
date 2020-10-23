import { Flex, SimpleGrid, Text } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";
import ClosestPagesButton from "../components/pagination/ClosestPagesButton";

export default function ComplexPagination({ pageInfo, resourcesLength, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, currentPageOffset, nextPageOffset, previousPageOffset, firstPageNumber, lastPageNumber, firstPageOffset, lastPageOffset } = pageInfo;
    const firstNumber = (firstPageNumber) ? firstPageNumber : (firstPageOffset !== null) ? firstPageOffset : null;
    const lastNumber = (lastPageNumber) ? lastPageNumber : (lastPageOffset !== null) ? lastPageOffset : null;
    const prevNumber = (previousPageNumber) ? previousPageNumber : (previousPageOffset !== null) ? previousPageOffset : null;
    const prevNumberText = (previousPageNumber) ? previousPageNumber + "" : (previousPageOffset !== null) ? (previousPageOffset + 1) + " - " + (previousPageOffset + resourcesLength) : null;
    const nextNumber = (nextPageNumber) ? nextPageNumber : (nextPageOffset) ? nextPageOffset : null;
    const nextNumberText = (nextPageNumber) ? nextPageNumber + "" : (nextPageOffset !== null) ? (nextPageOffset + 1) + " - " + (nextPageOffset + resourcesLength) : null;
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

            {(currentPageNumber) ? (
                <ClosestPagesButton pageInfo={pageInfo} onPageChange={onPageChange} />) :
                <SimpleGrid columns={3} spacing={10}>

                    {prevNumberText ? (
                        <PageButton
                            disabled={prevNumber === null || prevNumber < 0}
                            newPageNumber={prevNumber} {...commonPageButtonProps}>
                            {prevNumberText}
                        </PageButton>
                    ) : <Text></Text>}
                    <PageButton
                        disabled={true}
                        newPageNumber={currentNumber} {...commonPageButtonProps}>
                        {currentNumberText}
                    </PageButton>
                    {nextNumberText ? (
                        <PageButton
                            disabled={!nextNumber}
                            newPageNumber={nextNumber} {...commonPageButtonProps}>
                            {nextNumberText}
                        </PageButton>
                    ) : <Text></Text>}
                </SimpleGrid>}

            <PageButton
                disabled={!lastNumber || lastNumber === currentNumber}
                newPageNumber={lastNumber} {...commonPageButtonProps}>
                Last Page
            </PageButton>
        </Flex >
    );
}
