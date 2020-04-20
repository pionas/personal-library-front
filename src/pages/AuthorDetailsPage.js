import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/core";
import AuthorDetails from "../components/AuthorDetails";
const slugHelper = require("../functions/SlugHelper");

const ALL_AUTHORS_QUERY = gql`
  query AllAuthors {
    authors {
      name
      photo {
        url
      }
      books {
        title
        cover {
          url
        }
      }
    }
  }
`;

export default function AuthorDetailsPage() {
  let { name } = useParams();
  const { loading, error, data } = useQuery(ALL_AUTHORS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load authors...</p>;
  }
  const { authors } = data;

  const index = authors.findIndex(
    author => slugHelper.slug(author.name) === name
  );
  const author = authors[index];
  console.log(author);
  return (
    <Flex wrap="wrap" justify="space-around">
      <AuthorDetails key={author.name} author={author} />
    </Flex>
  );
}
