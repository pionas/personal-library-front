import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Flex, Heading, Stack } from "@chakra-ui/core";
import BookCopy from "../components/BookCopy";
import BorrowRandomBookButton from "../components/BookCopy/BorrowRandomBookButton";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";
import CurrentUserDetails, {
    CURRENT_USER_DETAILS_FIELDS_FRAGMENT
} from "../components/CurrentUserDetails";
import { GET_USER_QUERY } from "../pages/UserDetailsPage";

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
    const { loading, error, data, client: { cache } } = useQuery(GET_CURRENT_USER_QUERY);

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
    try {
        const cachedData = cache.readQuery({
            query: GET_USER_QUERY,
            variables: { userId: currentUser.id }
        });
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.isAdmin = currentUser.isAdmin;
        cache.writeQuery({
            query: GET_USER_QUERY,
            variables: { userId: currentUser.id },
            data
        });
    } catch (error) {
        cache.writeQuery({
            query: GET_USER_QUERY,
            variables: { userId: currentUser.id },
            data: { user: currentUser }
        });
    };
    return (
        <Stack>
            <CurrentUserDetails currentUser={currentUser} />
            {currentUser.ownedBookCopies.length > 0 && (
                <>
                    <Heading as="h3" size="lg" textAlign="center">
                        Your books
          </Heading>
                    <BorrowRandomBookButton />
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
