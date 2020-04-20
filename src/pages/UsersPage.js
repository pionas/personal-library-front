import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "../components/User";
import { SimpleGrid } from "@chakra-ui/core";

const ALL_USERS_QUERY = gql`
  query AllUsers {
    users {
      name
      avatar {
        image {
          url
        }
        color
      }
    }
  }
`;

export default function UsersPage() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load users...</p>;
  }
  const { users } = data;
  return (
    <SimpleGrid columns={[1, 2, 4]}>
      {users.map(user => (
        <User key={user.name} user={user} />
      ))}
    </SimpleGrid>
  );
}
