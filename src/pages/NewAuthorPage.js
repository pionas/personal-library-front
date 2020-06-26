import React from "react";
import { useNavigate } from "react-router";
import AuthorCreateForm from "../components/AuthorCreateForm";
import { useToast } from "../components/Toast";

export default function NewAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <AuthorCreateForm
            onCreate={() => {
                toast({ status: "warning", description: "NOT IMPLEMENTED" });
            }}
            onCancel={() => navigate("/authors")}
            isCreating={false}
        />
    );
}
