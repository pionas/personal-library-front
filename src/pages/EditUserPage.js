import React from "react";
import { useQuery } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useParams, useNavigate } from "react-router";
import { GET_USER_QUERY } from "./UserDetailsPage";
import UserUpdateForm from "../components/UserUpdateForm";

export default function EditUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const { userId } = useParams();
    const { loading, error, data } = useQuery(GET_USER_QUERY, {
        variables: { userId }
    });
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
                toast({ status: "warning", description: "NOT IMPLEMENTED" });
            }}
            onCancel={() => navigate(`/users/${userId}`)}
            isUpdating={false}
        />
    );
}
