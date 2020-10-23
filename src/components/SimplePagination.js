import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";

export default function SimplePagination({ pageInfo, onPageChange }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, } = pageInfo;

    const commonPageButtonProps = { currentPageNumber, onPageChange };

    return (
        <Flex justifyContent="space-between" my="5">
            <PageButton newPageNumber={previousPageNumber} {...commonPageButtonProps}>
                Next Page
          </PageButton>
            <PageButton
                newPageNumber={currentPageNumber}
                {...commonPageButtonProps}
            />
            <PageButton newPageNumber={nextPageNumber} {...commonPageButtonProps}>
                Next Page
          </PageButton>
        </Flex>
    );
}
