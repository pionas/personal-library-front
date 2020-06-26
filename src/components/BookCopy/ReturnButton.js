import { Button, useToast } from "@chakra-ui/core";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./fragments";

const RETURN_BOOK_COPY_MUTATION = gql`
  mutation ReturnBookCopy($bookCopyId: ID!) {
    returnBookCopy(id: $bookCopyId) {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowButton({ borrowedBookCopy }) {
  const toast = useToast();
  const [returnBook, { loading }] = useMutation(RETURN_BOOK_COPY_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "You've returned the book",
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    onError: error => {
      toast({
        title: "Error",
        description: "Could not return the book",
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    update: (cache, { data: { returnBookCopy } }) => {
      try {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id }
        });
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies = data.user.borrowedBookCopies.filter(
          borrowedBookCopy => borrowedBookCopy.id !== returnBookCopy.id
        );
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id },
          data
        });
      } catch (error) { }
    }
  });

  return (
    <Button
      disabled={loading}
      onClick={() =>
        returnBook({ variables: { bookCopyId: borrowedBookCopy.id } })
      }
    >
      Return
    </Button>
  );
}
