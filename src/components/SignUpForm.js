import React, { useRef } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Text,
    Stack
} from "@chakra-ui/core";
import Link from "./Link";

export default function UserCreateForm({
    onSignUp,
    isSigningUp,
    ...remainingProps
}) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onSignUp({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
    }
    return (
        <Box as="form" mt="5" w="100%" onSubmit={handleSubmit}>
            <FormControl isDisabled={isSigningUp}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input ref={nameRef} id="name" placeholder="John" />
            </FormControl>
            <FormControl isDisabled={isSigningUp}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                />
            </FormControl>
            <FormControl isDisabled={isSigningUp}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input ref={passwordRef} type="password" id="password" />
            </FormControl>
            <Stack isInline align="center" mt="3">
                <Button
                    isLoading={isSigningUp}
                    loadingText="Creating User..."
                    type="submit"
                    variantColor="green"
                >
                    Sign Up
        </Button>
                <Text>or</Text>
                <Link to="/login">Log In</Link>
            </Stack>
        </Box>
    );
}
