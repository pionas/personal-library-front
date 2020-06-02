import React from "react";
import { Stack } from "@chakra-ui/core";
import BorrowButton from "./BorrowButton";
import ReturnButton from "./ReturnButton";

export default function BookCopyActions({ bookCopy, ...remainingProps }) {
  const canBeReturned = !!bookCopy.borrower;
  const canBeBorrowed = !bookCopy.borrower;

  return (
    <Stack {...remainingProps}>
      {canBeBorrowed && <BorrowButton availableBookCopy={bookCopy} />}
      {canBeReturned && <ReturnButton borrowedBookCopy={bookCopy} />}
    </Stack>
  );
}
