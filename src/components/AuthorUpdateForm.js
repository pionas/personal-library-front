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

export default function AuthorUpdateForm({
    author,
    onUpdate,
    onCancel,
    isUpdating
}) {
    const nameRef = useRef();
    const bioRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdate({
            id: author.id,
            name: nameRef.current.value,
            bio: bioRef.current.value
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
                    defaultValue={author.name}
                />
            </FormControl>
            <FormControl isDisabled={isUpdating}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                    ref={bioRef}
                    id="bio"
                    placeholder="Here is a sample placeholder"
                    defaultValue={author.bio}
                />
            </FormControl>
            <ButtonGroup mt="3">
                <Button
                    isLoading={isUpdating}
                    loadingText="Updating Author..."
                    type="submit"
                    variantColor="green"
                >
                    Update Author
        </Button>
                <Button onClick={onCancel}>Cancel editing</Button>
            </ButtonGroup>
        </Box>
    );
}
