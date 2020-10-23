import React from "react";
import PageButton from "./pagination/PageButton";

export default function LoadMorePagination({ pageInfo, onPageChange }) {
    const { nextPageNumber } = pageInfo;
    return (
        <PageButton
            my="5"
            w="100%"
            newPageNumber={nextPageNumber}
            onPageChange={onPageChange}
        >
            Load more
        </PageButton>
    );
}
