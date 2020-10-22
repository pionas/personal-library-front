import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useParams, useNavigate } from "react-router";
import { GET_USER_QUERY } from "./UserDetailsPage";
import UserUpdateForm from "../components/UserUpdateForm";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
        updateUser(input: $updateUserInput) {
            success
            message
            user {
                ...userDetailsFields
            }
        }
    }
    ${USER_DETAILS_FIELDS_FRAGMENT}
`;
export default function EditUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const { userId } = useParams();
    const { loading, error, data } = useQuery(GET_USER_QUERY, {
        variables: { userId }
    });
    const [updateUser, { loading: isUpdating }] = useMutation(
        UPDATE_USER_MUTATION, {
        onCompleted: ({ updateUser: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            })
            if (success) {
                navigate(`/users/${userId}`);
            }
        },
        onError: error => {
            toast({
                description: error.message,
                status: "error"
            });
        }
    }
    );
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Could not load user...</p>;
    }
    const { user } = data;
    return (
        <UserUpdateForm
            user={user}
            onUpdate={updateUserInput => {
                updateUser({ variables: { updateUserInput } });
            }}
            onCancel={() => navigate(`/users/${userId}`)}
            isUpdating={isUpdating}
        />
    );
}
