import React from "react";
import { gql, useQuery } from "@apollo/client";
import Book from "../components/Book";
import User from "../components/User";
import Author from "../components/Author";

const RANDOM_QUERY = gql`
  query Randoms {
    randomBook {
      title
      cover {
        url
      }
      author {
        name
      }
    }
    randomUser {
      name
      avatar {
        image {
          url
        }
        color
      }
    }
    randomAuthor {
      name
      photo {
        url
      }
    }
  }
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
      <Book key={randomBook.title} {...randomBook} />
      <User key={randomUser.name} user={randomUser} />
      <Author key={randomAuthor.name} author={randomAuthor} />
    </>
  );
}
