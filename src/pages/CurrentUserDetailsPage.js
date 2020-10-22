import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Flex, Heading, Stack } from "@chakra-ui/core";
import BookCopy from "../components/BookCopy";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";
import CurrentUserDetails, {
    CURRENT_USER_DETAILS_FIELDS_FRAGMENT
} from "../components/CurrentUserDetails";

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      ...currentUserDetailsFields
      ownedBookCopies {
        ...bookCopyFields
      }
      borrowedBookCopies {
        ...bookCopyFields
      }
    }
  }
  ${CURRENT_USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function CurrentUserDetailsPage() {
    const { loading, error, data } = useQuery(GET_CURRENT_USER_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Could not load currentUser...</p>;
    }
    const { currentUser } = data;
    if (!currentUser) {
        return <p>You need to be logged in to see this page</p>;
    }
    return (
        <Stack>
            <CurrentUserDetails currentUser={currentUser} />
            {currentUser.ownedBookCopies.length > 0 && (
                <>
                    <Heading as="h3" size="lg" textAlign="center">
                        Your books
          </Heading>
                    <Flex wrap="wrap">
                        {currentUser.ownedBookCopies.map(bookCopy => (
                            <BookCopy
                                key={bookCopy.id}
                                bookCopy={bookCopy}
                                showBorrower
                                showActions
                            />
                        ))}
                    </Flex>
                </>
            )}
            {currentUser.borrowedBookCopies.length > 0 && (
                <>
                    <Heading as="h3" size="lg" textAlign="center">
                        Books you borrowed
          </Heading>
                    <Flex wrap="wrap">
                        {currentUser.borrowedBookCopies.map(bookCopy => (
                            <BookCopy
                                key={bookCopy.id}
                                bookCopy={bookCopy}
                                showOwner
                                showActions
                            />
                        ))}
                    </Flex>
                </>
            )}
        </Stack>
    );
}
