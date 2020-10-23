import { Button } from "@chakra-ui/core";
import React from "react";

export default function PageButton({
    disabled,
    newPageNumber,
    currentPageNumber,
    onPageChange,
    children,
    remainingProps
}) {
    return (
        <Button
            disabled={disabled || (!newPageNumber || newPageNumber === currentPageNumber)}
            onClick={() => onPageChange(newPageNumber)}
            {...remainingProps}
        >
            {children || newPageNumber}
        </Button>
    );
}
