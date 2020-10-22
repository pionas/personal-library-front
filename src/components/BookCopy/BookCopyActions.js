import React from "react";
import { Stack } from "@chakra-ui/core";
import BorrowButton from "./BorrowButton";
import ReturnButton from "./ReturnButton";
import { useAuth } from "../AuthProvider";

export default function BookCopyActions({ bookCopy, ...remainingProps }) {
  const { currentUser } = useAuth();
  const canBeReturned = !!bookCopy.borrower && currentUser && currentUser.id === bookCopy.borrower.id;
  const canBeBorrowed = !bookCopy.borrower && currentUser;

  return (
    <Stack {...remainingProps}>
      {canBeBorrowed && <BorrowButton availableBookCopy={bookCopy} />}
      {canBeReturned && <ReturnButton borrowedBookCopy={bookCopy} />}
    </Stack>
  );
}
