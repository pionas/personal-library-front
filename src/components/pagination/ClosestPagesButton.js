import { SimpleGrid } from "@chakra-ui/core";
import React from "react";
import PageButton from "./PageButton";

export default function ClosestPagesButtons({
    pageInfo,
    onPageChange,
    closestPagesCount = 5
}) {
    const { currentPageNumber, firstPageNumber, lastPageNumber } = pageInfo;

    const closestPagesStart = Math.max(
        firstPageNumber,
        Math.min(
            currentPageNumber - Math.ceil(closestPagesCount / 2),
            lastPageNumber - closestPagesCount
        )
    );
    const closestPagesEnd = Math.min(
        closestPagesStart + closestPagesCount,
        lastPageNumber
    );

    const closestPageNumbers = [
        ...Array(closestPagesEnd - closestPagesStart + 1).keys()
    ].map((i) => i + closestPagesStart);

    const commonPageButtonProps = { currentPageNumber, onPageChange };
    return (
        <SimpleGrid columns={closestPageNumbers.length} spacing={10}>
            {closestPageNumbers.map((pageNumber) => (
                <PageButton
                    key={pageNumber}
                    newPageNumber={pageNumber}
                    {...commonPageButtonProps}
                />
            ))}
        </SimpleGrid>
    );
}
