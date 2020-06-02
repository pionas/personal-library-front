import React from "react";
import { gql } from "@apollo/client";
import AuthorDetails, {
  AUTHOR_DETAILS_FIELDS_FRAGMENT
} from "../components/AuthorDetails";
import BookDetails, {
  BOOK_DETAILS_FIELDS_FRAGMENT
} from "../components/BookDetails";
import UserDetails, {
  USER_DETAILS_FIELDS_FRAGMENT
} from "../components/UserDetails";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./BookCopy/fragments";
import BookCopy from "./BookCopy";

export const ANYTHING_DETAILS_FIELDS_FRAGMENT = gql`
  fragment anythingDetailsFields on Anything {
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

export default function AnythingDetails({ anything }) {
  switch (anything.__typename) {
    case "Book": {
      return <BookDetails book={anything} />;
    }
    case "BookCopy": {
      return <BookCopy bookCopy={anything} showOwner showBorrower />;
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
