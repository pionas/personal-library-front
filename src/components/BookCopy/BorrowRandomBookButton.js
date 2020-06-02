import { Button, useToast } from "@chakra-ui/core";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./fragments";

const BORROW_RANDOM_BOOK_COPY_MUTATION = gql`
  mutation BorrowRandomBook {
    borrowRandomBook {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowRandomBookButton() {
  const toast = useToast();
  const [borrowRandomBook, { loading }] = useMutation(
    BORROW_RANDOM_BOOK_COPY_MUTATION,
    {
      onCompleted: (data) => {
        if (data.borrowRandomBook == null) {
          toast({
            title: "Information",
            description: "There is no books to borrow",
            status: "info",
            duration: 1000,
            position: "top",
            isClosable: true
          });
          return;
        }
        toast({
          title: "Success",
          description: "You've borrowed the random book",
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true
        });
      },
      onError: error => {
        toast({
          title: "Could not borrow the random book",
          description: error.message,
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true
        });
      },
      refetchQueries: ({ data }) => {
        if (data.borrowRandomBook == null || data.borrowRandomBook.borrower == null) {
          return [];
        }
        return [
          {
            query: GET_USER_QUERY,
            variables: { userId: data.borrowRandomBook.borrower.id }
          }
        ];
      }
    }
  );

  return (
    <Button disabled={loading} onClick={borrowRandomBook}>
      Borrow Random Book
    </Button>
  );
}
