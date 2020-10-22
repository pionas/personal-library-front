import React from "react";
import { gql } from "@apollo/client";
import UserDetails, { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";

export const CURRENT_USER_DETAILS_FIELDS_FRAGMENT = gql`
  fragment currentUserDetailsFields on User {
    ...userDetailsFields
    isAdmin
    email
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;

export default function CurrentUserDetails({ currentUser }) {
  return (
    <UserDetails user={currentUser} />
  );
}
