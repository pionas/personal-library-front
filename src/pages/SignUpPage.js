import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useAuth } from "../components/AuthProvider";
import SignUpForm from "../components/SignUpForm";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($credential: SignUpInput!) {
    signUp(input: $credential) {
      success
      message
      token
    }
  }
`;
export default function SignUpPage() {
    const { authorize } = useAuth();
    const toast = useToast();
    const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
        onCompleted: ({ signUp: { success, message, token } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                authorize(token);
            }
        },
    });
    return (
        <SignUpForm
            onSignUp={credential => signUp({ variables: { credential } })}
            isSigningUp={loading}
        />
    );
}
