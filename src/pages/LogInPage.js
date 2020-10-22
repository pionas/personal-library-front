import React from "react";
import { gql, useMutation } from "@apollo/client";
import LogInForm from "../components/LogInForm";
import { useToast } from "../components/Toast";
import { useAuth, cleanAuthToken } from "../components/AuthProvider";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";
import { CURRENT_USER_DETAILS_FIELDS_FRAGMENT } from "../components/CurrentUserDetails";
import { GET_CURRENT_USER_QUERY } from "./CurrentUserDetailsPage";
const LOG_IN_MUTATION = gql`
  mutation LogIn($credential: LogInInput!) {
    logIn(input: $credential) {
      success
      message
      token
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
  }
  ${CURRENT_USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;
export default function LogInPage() {
    const { authorize } = useAuth();
    const toast = useToast();
    const [logIn, { loading }] = useMutation(LOG_IN_MUTATION, {
        onCompleted: ({ logIn: { success, message, token } }) => {
            cleanAuthToken();
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                authorize(token);
            }
        },
        update: (cache, { data: { logIn } }) => {
            if (!logIn || !logIn.currentUser) {
                return;
            }
            try {
                cache.writeQuery({
                    query: GET_CURRENT_USER_QUERY,
                    data: {
                        currentUser: logIn.currentUser
                    }
                });
            } catch (error) { }

        }
    });
    return (
        <LogInForm
            onLogIn={credential => logIn({ variables: { credential } })}
            isLoggingIn={loading}
        />
    );
}
