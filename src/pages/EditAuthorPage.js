import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useParams, useNavigate } from "react-router";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";
import AuthorUpdateForm from "../components/AuthorUpdateForm";
import { AUTHOR_DETAILS_FIELDS_FRAGMENT } from "../components/AuthorDetails";

const UPDATE_AUTHOR_MUTATION = gql`
    mutation UpdateAuthor($updateAuthorInput: UpdateAuthorInput!) {
        updateAuthor(input: $updateAuthorInput) {
            success
            message
            author {
                ...authorDetailsFields
            }
        }
    }
    ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
`;
export default function EditAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const { authorId } = useParams();
    const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
        variables: { authorId }
    });
    const [updateAuthor, { loading: isUpdating }] = useMutation(
        UPDATE_AUTHOR_MUTATION, {
        onCompleted: ({ updateAuthor: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            })
            if (success) {
                navigate(`/authors/${authorId}`);
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
        return <p>Could not load author...</p>;
    }
    const { author } = data;
    return (
        <AuthorUpdateForm
            author={author}
            onUpdate={updateAuthorInput => {
                updateAuthor({ variables: { updateAuthorInput } });
            }}
            onCancel={() => navigate(`/authors/${authorId}`)}
            isUpdating={isUpdating}
        />
    );
}
