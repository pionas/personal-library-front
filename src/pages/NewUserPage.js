import React from "react";
import { useNavigate } from "react-router";
import UserCreateForm from "../components/UserCreateForm";
import { useToast } from "../components/Toast";

export default function NewUserPage() {
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <UserCreateForm
            onCreate={() => {
                toast({ status: "warning", description: "NOT IMPLEMENTED" });
            }}
            onCancel={() => navigate("/users")}
            isCreating={false}
        />
    );
}
