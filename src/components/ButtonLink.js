import React from "react";
import { Button } from "@chakra-ui/core";
import { useNavigate } from "react-router";

export default function ButtonLink({ to, ...remainingProps }) {
    const navigate = useNavigate();
    return <Button onClick={() => navigate(to)} {...remainingProps} />;
}
