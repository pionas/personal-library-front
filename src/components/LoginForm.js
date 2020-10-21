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
    onLogIn,
    isLoggingIn,
    ...remainingProps
}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onLogIn({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
    }
    return (
        <Box as="form" mt="5" w="100%" onSubmit={handleSubmit}>
            <FormControl isDisabled={isLoggingIn}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                />
            </FormControl>
            <FormControl isDisabled={isLoggingIn}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input ref={passwordRef} type="password" id="password" />
            </FormControl>
            <Stack isInline align="center" mt="3">
                <Button
                    isLoading={isLoggingIn}
                    loadingText="Creating User..."
                    type="submit"
                    variantColor="green"
                >
                    Log In
        </Button>
                <Text>or</Text>
                <Link to="/signup">Sign Up</Link>
            </Stack>
        </Box>
    );
}
