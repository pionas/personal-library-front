import { gql } from "@apollo/client";
import { AVATAR_FIELDS_FRAGMENT } from "../Avatar";

export const BOOK_COPY_FIELDS_FRAGMENT = gql`
  fragment bookCopyFields on BookCopy {
    id
    book {
      cover {
        url
      }
    }
    owner {
      id
      name
      avatar {
        ...avatarFields
      }
    }
    borrower {
      id
      name
      avatar {
        ...avatarFields
      }
    }
  }
  ${AVATAR_FIELDS_FRAGMENT}
`;

export const PAGE_INFO_FIELDS_FRAGMENT = gql`
  fragment pageInfo on PageInfo {
    currentPageNumber
    nextPageNumber
    previousPageNumber
    firstPageNumber
    lastPageNumber
    currentPageOffset
    nextPageOffset
    previousPageOffset
    firstPageOffset
    lastPageOffset
  }
`;
