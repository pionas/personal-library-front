import React from "react";
import { gql, useMutation } from "@apollo/client";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";
import { useNavigate } from "react-router";
import UserCreateForm from "../components/UserCreateForm";
import { ALL_USERS_QUERY } from "./UsersPage";
import { GET_USER_QUERY } from "./UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";
import { useToast } from "../components/Toast";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      success
      message
      user {
        ...userDetailsFields
        ownedBookCopies {
          ...bookCopyFields
        }
        borrowedBookCopies {
          ...bookCopyFields
        }
      }
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function NewUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const [createUser, { loading: isCreating }] = useMutation(
        CREATE_USER_MUTATION,
        {
            onError: error => {
                toast({
                    description: error.message,
                    status: "error"
                });
            },
            onCompleted: ({ createUser }) => {
                const { success, message, user } = createUser;
                toast({
                    description: message,
                    status: success ? "success" : "error"
                });
                if (success) {
                    navigate(`/users/${user.id}`);
                }
            },
            update: (cache, { data: { createUser } }) => {
                if (!createUser || !createUser.user) {
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
                            users: [...cachedData.users, createUser.user]
                        }
                    });
                } catch (error) { }
                cache.writeQuery({
                    query: GET_USER_QUERY,
                    variables: { userId: createUser.user.id },
                    data: {
                        user: createUser.user
                    }
                });
            }
        }
    );
    return (
        <UserCreateForm
            onCreate={createUserInput => {
                createUser({ variables: { createUserInput } });
            }}
            onCancel={() => navigate("/users")}
            isCreating={isCreating}
        />
    );
}
