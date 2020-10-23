import { Button } from "@chakra-ui/core";
import React from "react";

export default function PageButton({
    disabled,
    newPageNumber,
    onPageChange,
    children,
    remainingProps
}) {
    return (
        <Button
            disabled={disabled}
            onClick={() => onPageChange(newPageNumber)}
            {...remainingProps}
        >
            {children || newPageNumber}
        </Button>
    );
}
