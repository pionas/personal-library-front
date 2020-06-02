import React from "react";
import { gql, useQuery } from "@apollo/client";
import Book from "../components/Book";
import User from "../components/User";
import Author from "../components/Author";
import Link from "../components/Link";
import { BOOK_FIELDS_FRAGMENT } from "../components/Book";
import { USER_FIELDS_FRAGMENT } from "../components/User";
import { AUTHORS_FIELDS_FRAGMENT } from "../components/Author";

const RANDOM_QUERY = gql`
  query Randoms {
    randomBook {
      ...bookFields
    }
    randomUser {
      ...userFields
    }
    randomAuthor {
      ...authorFields
    }
  }
  ${BOOK_FIELDS_FRAGMENT}
  ${USER_FIELDS_FRAGMENT}
  ${AUTHORS_FIELDS_FRAGMENT}
`;

export default function RandomPage() {
  const { loading, error, data } = useQuery(RANDOM_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load randoms...</p>;
  }
  const { randomBook, randomUser, randomAuthor } = data;
  return (
    <>
      <Link key={randomBook.title} to={`/books/${randomBook.id}`}>
        <Book {...randomBook} />
      </Link>
      <Link key={randomUser.name} to={`/users/${randomUser.id}`}>
        <User user={randomUser} />
      </Link>
      <Author key={randomAuthor.name} author={randomAuthor} />
    </>
  );
}
