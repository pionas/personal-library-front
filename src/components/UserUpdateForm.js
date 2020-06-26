import React, { useRef } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Box,
    ButtonGroup
} from "@chakra-ui/core";

export default function UserUpdateForm({
    user,
    onUpdate,
    onCancel,
    isUpdating
}) {
    const nameRef = useRef();
    const infoRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdate({
            id: user.id,
            name: nameRef.current.value,
            info: infoRef.current.value
        });
    }
    return (
        <Box as="form" mt="5" onSubmit={handleSubmit}>
            <FormControl isDisabled={isUpdating}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    ref={nameRef}
                    id="name"
                    placeholder="John"
                    defaultValue={user.name}
                />
            </FormControl>
            <FormControl isDisabled={isUpdating}>
                <FormLabel htmlFor="info">Info</FormLabel>
                <Textarea
                    ref={infoRef}
                    id="info"
                    placeholder="Here is a sample placeholder"
                    defaultValue={user.info}
                />
            </FormControl>
            <ButtonGroup mt="3">
                <Button
                    isLoading={isUpdating}
                    loadingText="Updating User..."
                    type="submit"
                    variantColor="green"
                >
                    Update User
        </Button>
                <Button onClick={onCancel}>Cancel editing</Button>
            </ButtonGroup>
        </Box>
    );
}
