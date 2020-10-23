import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";
import { updateQueryByReplacing } from "./pagination/updateQueryFunctions";

export default function SimplePagination({ pageInfo, fetchMore, setTryLoading }) {
    const { currentPageNumber, nextPageNumber, previousPageNumber, } = pageInfo;

    function handlePageChange(pageNumber) {
        if (setTryLoading) {
            setTryLoading(true);
        }
        fetchMore({
            variables: { pageNumber },
            updateQuery: (previousQueryResult, options) => {
                if (setTryLoading) {
                    setTryLoading(false);
                }
                return updateQueryByReplacing(previousQueryResult, options);
            }
        });
    }

    const commonPageButtonProps = { currentPageNumber, onPageChange: handlePageChange };

    return (
        <Flex justifyContent="space-between" my="5">
            <PageButton newPageNumber={previousPageNumber} {...commonPageButtonProps}>
                Previous Page
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
