import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/core";
import { useParams } from "react-router";
import UserDetails, {
  USER_DETAILS_FIELDS_FRAGMENT
} from "../components/UserDetails";

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...userDetailsFields
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load book "{userId}"</p>;
  }
  const { user } = data;
  return (
    <Flex wrap="wrap" justify="space-around">
      <UserDetails user={user} />
    </Flex>
  );
}
