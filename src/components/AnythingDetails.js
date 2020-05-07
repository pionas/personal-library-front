import React from "react";
import BookDetails, { BOOK_DETAILS_FIELDS_FRAGMENT } from "./BookDetails";
import AuthorDetails, { AUTHOR_DETAILS_FIELDS_FRAGMENT } from "./AuthorDetails";
import UserDetails, { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";
import { gql } from "@apollo/client";

export const ANYTHING_DETAILS_FIELDS_FRAGMENT = gql`
  fragment anythingDetailsFields on Anything {
    ...bookDetailsFields
    ...authorDetailsFields
    ...userDetailsFields
  }
  ${BOOK_DETAILS_FIELDS_FRAGMENT}
  ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;
export default function AnythingDetails({ anything }) {
  switch (anything.__typename) {
    case "Book": {
      return <BookDetails book={anything} />;
    }
    case "Author": {
      return <AuthorDetails author={anything} />;
    }
    case "User": {
      return <UserDetails user={anything} />;
    }
    default: {
      return <p>Unsupported __typename - [{anything.__typename}]</p>;
    }
  }
}
