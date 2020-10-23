import React from "react";
import PageButton from "./pagination/PageButton";
import { createUpdateQueryByAppending } from "./pagination/updateQueryFunctions";

export default function LoadMorePagination({ queryName, pageInfo, fetchMore, setTryLoading }) {
    const { nextPageNumber } = pageInfo;
    const updateQueryByAppending = createUpdateQueryByAppending(queryName);
    return (
        <PageButton
            my="5"
            w="100%"
            newPageNumber={nextPageNumber}
            onPageChange={(pageNumber) => {
                if (setTryLoading) {
                    setTryLoading(true);
                }
                fetchMore({
                    variables: { pageNumber },
                    updateQuery: (previousQueryResult, options) => {
                        if (setTryLoading) {
                            setTryLoading(false);
                        }
                        return updateQueryByAppending(previousQueryResult, options);
                    }
                });
            }}
        >
            Load more
        </PageButton>
    );
}
