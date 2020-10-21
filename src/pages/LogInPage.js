import React from "react";
import LogInForm from "../components/LogInForm";

export default function LogInPage() {
    return (
        <LogInForm
            onLogIn={credentials => console.log("Trying to log in as:", credentials)}
            isLoggingIn={false}
        />
    );
}
