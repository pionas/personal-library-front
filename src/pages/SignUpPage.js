import React from "react";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
    return (
        <SignUpForm
            onSignUp={signUpData => console.log("Trying to sign up as", signUpData)}
            isSigningUp={false}
        />
    );
}
