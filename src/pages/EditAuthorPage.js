import React from "react";
import { useQuery } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useParams, useNavigate } from "react-router";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";
import AuthorUpdateForm from "../components/AuthorUpdateForm";

export default function EditAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const { authorId } = useParams();
    const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
        variables: { authorId }
    });
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
                toast({ status: "warning", description: "NOT IMPLEMENTED" });
            }}
            onCancel={() => navigate(`/authors/${authorId}`)}
            isUpdating={false}
        />
    );
}
