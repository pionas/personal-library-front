import React from "react";
import { gql } from "@apollo/client";
import AuthorDetails, {
  AUTHOR_DETAILS_FIELDS_FRAGMENT
} from "./AuthorDetails";
import BookDetails, {
  BOOK_DETAILS_FIELDS_FRAGMENT
} from "./BookDetails";
import UserDetails, {
  USER_DETAILS_FIELDS_FRAGMENT
} from "./UserDetails";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./BookCopy/fragments";
import BookCopy from "./BookCopy";

export const RESOURCE_DETAILS_FIELDS_FRAGMENT = gql`
  fragment resourceDetailsFields on Resource {
    ...userDetailsFields
    ...bookDetailsFields
    ...authorDetailsFields
    ...bookCopyFields
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_DETAILS_FIELDS_FRAGMENT}
  ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function ResourceDetails({ resource }) {
  switch (resource.__typename) {
    case "Book": {
      return <BookDetails book={resource} />;
    }
    case "BookCopy": {
      return <BookCopy bookCopy={resource} showOwner showBorrower />;
    }
    case "Author": {
      return <AuthorDetails author={resource} />;
    }
    case "User": {
      return <UserDetails user={resource} />;
    }
    default: {
      return <p>Unsupported __typename - [{resource.__typename}]</p>;
    }
  }
}
