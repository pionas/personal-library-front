import { Flex } from "@chakra-ui/core";
import React from "react";
import PageButton from "../components/pagination/PageButton";
import ClosestPagesButtons from "../components/pagination/ClosestPagesButtons";
import { updateQueryByReplacing } from "./pagination/updateQueryFunctions";

export default function ComplexPagination({ pageInfo, fetchMore, setTryLoading }) {
    const { currentPageNumber, firstPageNumber, lastPageNumber } = pageInfo;


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
            <PageButton newPageNumber={firstPageNumber} {...commonPageButtonProps}>
                First Page
      </PageButton>
            <ClosestPagesButtons
                pageInfo={pageInfo}
                onPageChange={handlePageChange}
            />
            <PageButton newPageNumber={lastPageNumber} {...commonPageButtonProps}>
                Last Page
      </PageButton>
        </Flex>
    );
}
