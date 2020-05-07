import React from "react";
import { gql, useQuery } from "@apollo/client";
import { SimpleGrid, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import User from "../components/User";

const ALL_USERS_QUERY = gql`
  query AllUsers {
    users {
      id
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
    <Box w="100%">
      <SimpleGrid columns={[1, 2, 4]}>
        {users.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <User user={user} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
