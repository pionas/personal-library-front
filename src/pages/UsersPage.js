import React from "react";
import { gql, useQuery } from "@apollo/client";
import { SimpleGrid, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import User from "../components/User";
import SearchBox, { useSearchQuery } from "../components/SearchBox";

const ALL_USERS_QUERY = gql`
  query AllUsers($searchQuery: String!) {
    users(searchQuery: $searchQuery) {
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
  const [searchQueryDecode, handleSearchQueryChange] = useSearchQuery("/users/search/");

  const { loading, error, data } = useQuery(ALL_USERS_QUERY, {
    variables: { searchQuery: searchQueryDecode }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load users...</p>;
  }
  const { users } = data;
  const hasUsers = users.length > 0;
  return (
    <Box w="100%">
      <SearchBox searchQuery={searchQueryDecode} onSearchQueryChange={handleSearchQueryChange} />
      <SimpleGrid columns={[1, 2, 4]}>
        {hasUsers ? users.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <User user={user} />
          </Link>
        )) : <p>No users found</p>}
      </SimpleGrid>
    </Box>
  );
}
