import React from "react";
import { Flex, Heading, Box, Divider } from "@chakra-ui/core";
import Link from "./Link";
import GuestMenu from "./Header/GuestMenu";
import UserMenu from "./Header/UserMenu";
import { useAuth } from "./AuthProvider";

function Header(props) {
    const { currentUser, unauthorize } = useAuth();
    return (
        <Flex
            direction={["column", null, "row"]}
            align="center"
            justifyContent="space-between"
            w="100%"
            mx="5"
            mt="3"
        >
            <Link to="/">
                <Heading as="h1">Personal Library</Heading>
            </Link>

            <Box d="flex" align="center" justifyContent="space-between">
                <Link to="/">
                    <h1>Books</h1>
                </Link>
                <Divider orientation="vertical" />
                <Link to="/authors">
                    <h1>Authors</h1>
                </Link>
                <Divider orientation="vertical" />
                <Link to="/users">
                    <h1>Users</h1>
                </Link>
                <Divider orientation="vertical" />
                <Link to="/random">
                    <h1>Random</h1>
                </Link>
                <Divider orientation="vertical" />
                {!currentUser ? (
                    <GuestMenu />
                ) : (
                        <UserMenu
                            currentUser={currentUser}
                            onLogOut={unauthorize}
                        />
                    )}
            </Box>
        </Flex>
    );
}
export default Header;
