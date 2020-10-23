export function updateQueryByReplacing(
    previousQueryResult,
    { fetchMoreResult }
) {
    if (!fetchMoreResult) {
        return previousQueryResult;
    }
    return fetchMoreResult;
}

export function createUpdateQueryByAppending(queryName) {
    return function updateQueryByAppending(previousQueryResult, { fetchMoreResult }) {
        if (!fetchMoreResult) {
            return previousQueryResult;
        }
        return {
            [queryName]: {
                results: [
                    ...previousQueryResult[queryName].results,
                    ...fetchMoreResult[queryName].results
                ],
                pageInfo: { ...fetchMoreResult[queryName].pageInfo }
            }
        };
    }

}
