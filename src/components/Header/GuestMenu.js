import React from "react";
import { MenuList, Menu, MenuButton, MenuItem } from "@chakra-ui/core";
import { useNavigate } from "react-router";

function GuestMenu() {
    const navigate = useNavigate();
    return (
        <Menu>
            <MenuButton>Hi&nbsp;Stranger!</MenuButton>
            <MenuList>
                <MenuItem onClick={() => navigate("/signup")}>
                    <strong>Sign Up!</strong>
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>Log in</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default GuestMenu;
