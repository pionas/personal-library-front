import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";
import ClosestPagesButtons from "../components/pagination/ClosestPagesButtons";

export default function ComplexPagination({ pageInfo, onPageChange }) {
    const { currentNumber, firstPageNumber, lastPageNumber } = pageInfo;

    const commonPageButtonProps = { currentNumber, onPageChange };
    return (
        <Flex justifyContent="space-between" my="5">
            <PageButton newPageNumber={firstPageNumber} {...commonPageButtonProps}>
                First Page
      </PageButton>
            <ClosestPagesButtons
                pageInfo={pageInfo}
                onPageChange={onPageChange}
            />
            <PageButton newPageNumber={lastPageNumber} {...commonPageButtonProps}>
                Last Page
      </PageButton>
        </Flex>
    );
}
