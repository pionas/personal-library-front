import { Button, useToast } from "@chakra-ui/core";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./fragments";

const BORROW_BOOK_COPY_MUTATION = gql`
  mutation BorrowBookCopy($bookCopyId: ID!) {
    borrowBookCopy(id: $bookCopyId) {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowButton({ availableBookCopy }) {
  const toast = useToast();
  const [borrowBook, { loading }] = useMutation(BORROW_BOOK_COPY_MUTATION, {
    variables: { bookCopyId: availableBookCopy.id },
    onCompleted: () => {
      toast({
        title: "Success",
        description: "You've borrowed the book",
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    onError: error => {
      toast({
        title: "Could not borrow the book",
        description: error.message,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    refetchQueries: ({ data }) => {
      return [
        {
          query: GET_USER_QUERY,
          variables: { userId: data.borrowBookCopy.borrower.id }
        }
      ];
    }
  });

  return (
    <Button disabled={loading} onClick={borrowBook}>
      Borrow
    </Button>
  );
}
