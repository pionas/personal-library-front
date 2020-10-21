import React from "react";
import {
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@chakra-ui/core";
import { useNavigate } from "react-router";
import Avatar from "../Avatar";

function UserMenu({ currentUser, onLogOut }) {
    const navigate = useNavigate();
    return (
        <Menu>
            <MenuButton rightIcon="chevron-down">
                <Stack isInline>
                    <Text>Hi</Text>
                    <Avatar size="xs" avatar={currentUser.avatar} />
                    <Text>{currentUser.name}!</Text>
                </Stack>
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => navigate("/me")}>Profile</MenuItem>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default UserMenu;
