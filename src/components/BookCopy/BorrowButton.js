import { Button } from "@chakra-ui/core";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./fragments";
import { useToast } from "../Toast";

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
        description: "You've borrowed the book",
        status: "success"
      });
    },
    onError: error => {
      toast({
        description: error.message,
        status: "error"
      });
    },
    update: (cache, { data: { borrowBookCopy } }) => {
      try {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowBookCopy.borrower.id }
        });
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies.push(borrowBookCopy);
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowBookCopy.borrower.id },
          data
        });
        console.info("Updated cached user data");
      } catch (error) {
        console.info("Did not update cached user data: ", error);
      }
    }
  });

  return (
    <Button disabled={loading} onClick={borrowBook}>
      Borrow
    </Button>
  );
}
