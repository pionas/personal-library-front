import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/core";
import { useToast } from "./Toast";

const RESET_DATA_MUTATION = gql`
  mutation ResetData {
    resetData {
      success
      message
    }
  }
`;

export default function ResetDataButton(props) {
    const toast = useToast();
    const [resetData, { loading, client }] = useMutation(RESET_DATA_MUTATION, {
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
        onCompleted: ({ resetData: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                client.resetStore();
            }
        }
    });
    return (
        <Button onClick={() => resetData()} isLoading={loading} {...props}>
            Reset Data
        </Button>
    );
}