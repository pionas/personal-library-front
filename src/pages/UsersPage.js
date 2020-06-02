import React from "react";
import { gql, useQuery } from "@apollo/client";
import User, { USER_FIELDS_FRAGMENT } from "../components/User";
import { SimpleGrid, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";

const ALL_USERS_QUERY = gql`
  query AllUsers($searchQuery: String!) {
    users(searchQuery: $searchQuery) {
      ...userFields
    }
  }
  ${USER_FIELDS_FRAGMENT}
`;

export default function UsersPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/users/search/"
  );
  const { loading, error, data } = useQuery(ALL_USERS_QUERY, {
    variables: { searchQuery }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load users...</p>;
  }
  const { users } = data;
  return (
    <Box w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />

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
