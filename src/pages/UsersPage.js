import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import User, { USER_FIELDS_FRAGMENT } from "../components/User";
import { CircularProgress, SimpleGrid, Stack, Box } from "@chakra-ui/core";
import Link from "../components/Link";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import AdminActions from "../components/AdminActions";
import ResetDataButton from "../components/ResetDataButton";
import UserDeleteButton from "../components/UserDeleteButton";
import ButtonLink from "../components/ButtonLink";
import Pagination from "../components/ComplexPagination";
import { PAGE_INFO_FIELDS_FRAGMENT } from "../components/BookCopy/fragments";

export const ALL_USERS_QUERY = gql`
  query AllUsers($searchQuery: String!, $pageNumber: Int = 1) {
    users(searchQuery: $searchQuery, pageSize: 4, pageNumber: $pageNumber) {
      results {
        ...userFields
      }
      pageInfo {
        ...pageInfo
      }      
    }
  }
  ${USER_FIELDS_FRAGMENT}
  ${PAGE_INFO_FIELDS_FRAGMENT}
`;

export default function UsersPage() {
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(
    "/users/search/"
  );
  const [tryLoading, setTryLoading] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(ALL_USERS_QUERY, {
    variables: { searchQuery }
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load users...</p>;
  }
  const { users: { results: users, pageInfo } } = data;
  const hasUsers = users.length > 0;
  return (
    <Stack w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {hasUsers ? (
        <>
          <SimpleGrid columns={[1, 2, 3, 4]}>
            {users.map(user => (
              <Stack key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <User user={user} />
                </Link>
                <AdminActions direction="column">
                  <ButtonLink to={`/users/${user.id}/edit`}>Edit user</ButtonLink>
                  <UserDeleteButton userId={user.id} />
                </AdminActions>
              </Stack>
            ))}
          </SimpleGrid>
          {tryLoading ? (
            <Box display="flex" alignItems="center" justifyContent="space-between" bg="gray.200" pos="fixed" top="0" left="0" h="100%" w="100%" zIndex={2} opacity="0.3">
              <CircularProgress isIndeterminate color="black.200" size="120px" w="100%" />
            </Box>) : null}
          <Pagination
            queryName={"users"}
            pageInfo={pageInfo}
            fetchMore={fetchMore}
            setTryLoading={setTryLoading}
          />
        </>
      ) : (
          <p>No users found</p>
        )}
      <AdminActions>
        <ButtonLink to={"/users/new"}>Create new User</ButtonLink>
        <ResetDataButton />
      </AdminActions>
    </Stack>
  );
}
