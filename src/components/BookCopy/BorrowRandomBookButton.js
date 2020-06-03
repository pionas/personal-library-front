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
      update: (cache, { data: { borrowRandomBook } }) => {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowRandomBook.borrower.id }
        });
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies.push(borrowRandomBook);
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowRandomBook.borrower.id },
          data
        });
      }
    });

  return (
    <Button disabled={loading} onClick={borrowRandomBook}>
      Borrow Random Book
    </Button>
  );
}
