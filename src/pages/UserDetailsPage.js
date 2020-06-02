import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Flex, Heading, Stack } from "@chakra-ui/core";
import { useParams } from "react-router";
import UserDetails, {
  USER_DETAILS_FIELDS_FRAGMENT
} from "../components/UserDetails";
import BookCopy from "../components/BookCopy";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";
import BorrowRandomBookButton from "../components/BookCopy/BorrowRandomBookButton";

export const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...userDetailsFields
      ownedBookCopies {
        ...bookCopyFields
      }
      borrowedBookCopies {
        ...bookCopyFields
      }
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load user...</p>;
  }
  const { user } = data;
  return (
    <Stack>
      <UserDetails user={user} />
      <BorrowRandomBookButton />
      <Heading as="h3" size="lg" textAlign="center">
        Owned books
      </Heading>
      <Flex wrap="wrap">
        {user.ownedBookCopies.map(bookCopy => (
          <BookCopy
            key={bookCopy.id}
            bookCopy={bookCopy}
            showBorrower
            showActions
          />
        ))}
      </Flex>
      <Heading as="h3" size="lg" textAlign="center">
        Borrowed books
      </Heading>
      <Flex wrap="wrap">
        {user.borrowedBookCopies.map(bookCopy => (
          <BookCopy
            key={bookCopy.id}
            bookCopy={bookCopy}
            showOwner
            showActions
          />
        ))}
      </Flex>
    </Stack>
  );
}
