import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useNavigate } from "react-router";
import { ALL_AUTHORS_QUERY } from "../pages/AuthorsPage";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";
import AuthorCreateForm from "../components/AuthorCreateForm";
import { AUTHOR_DETAILS_FIELDS_FRAGMENT } from "../components/AuthorDetails";

const CREATE_AUTHOR_MUTATION = gql`
    mutation CreateAuthor($createAuthorInput: CreateAuthorInput!) {
        createAuthor(input: $createAuthorInput) {
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
    const [createAuthor, { loading: isCreating }] = useMutation(
        CREATE_AUTHOR_MUTATION,
        {
            onCompleted: ({ createAuthor }) => {
                const { success, message, author } = createAuthor;
                toast({
                    description: message,
                    status: success ? "success" : "error"
                });
                if (success) {
                    navigate(`/authors/${author.id}`);
                }
            },
            onError: error => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 1000,
                    position: "top",
                    isClosable: true
                });
            },
            update: (cache, { data: { createAuthor } }) => {
                try {
                    const cachedData = cache.readQuery({
                        query: ALL_AUTHORS_QUERY,
                        variables: { searchQuery: "" }
                    });
                    cache.writeQuery({
                        query: ALL_AUTHORS_QUERY,
                        variables: { searchQuery: "" },
                        data: {
                            authors: [...cachedData.authors, createAuthor.author]
                        }
                    });
                    console.info("Updated cached authors data.");
                } catch (error) { }
                try {
                    cache.writeQuery({
                        query: GET_AUTHOR_QUERY,
                        variables: { authorId: createAuthor.author.id },
                        data: {
                            author: createAuthor.author
                        }
                    });
                } catch (error) { }
            }
        }
    );
    return (
        <AuthorCreateForm
            onCreate={createAuthorInput => {
                createAuthor({ variables: { createAuthorInput } });
            }}
            onCancel={() => navigate("/authors")}
            isCreating={isCreating}
        />
    );
}
