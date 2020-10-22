import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useAuth } from "../components/AuthProvider";
import SignUpForm from "../components/SignUpForm";
import { ALL_USERS_QUERY } from "./UsersPage";
import { GET_USER_QUERY } from "./UserDetailsPage";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($credential: SignUpInput!) {
    signUp(input: $credential) {
      success
      message
      token
      currentUser {
        ...userDetailsFields
      }
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;
export default function SignUpPage() {
    const { authorize } = useAuth();
    const toast = useToast();
    const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
        onError: error => {
            toast({
                description: error.message,
                status: "error"
            });
        },
        onCompleted: ({ signUp: { success, message, token } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                authorize(token);
            }
        },
        update: (cache, { data: { signUp } }) => {
            if (!signUp || !signUp.currentUser) {
                return;
            }
            try {
                const cachedData = cache.readQuery({
                    query: ALL_USERS_QUERY,
                    variables: { searchQuery: "" }
                });
                cache.writeQuery({
                    query: ALL_USERS_QUERY,
                    variables: { searchQuery: "" },
                    data: {
                        users: [...cachedData.users, signUp.currentUser]
                    }
                });
            } catch (error) { }
            cache.writeQuery({
                query: GET_USER_QUERY,
                variables: { userId: signUp.currentUser.id },
                data: {
                    user: signUp.currentUser
                }
            });
        }
    });
    return (
        <SignUpForm
            onSignUp={credential => signUp({ variables: { credential } })}
            isSigningUp={loading}
        />
    );
}
