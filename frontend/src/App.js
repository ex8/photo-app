import React from 'react';
import gql from 'graphql-tag';
import { BrowserRouter } from 'react-router-dom';

import Users from './components/Users';
import AuthorizedUser from './components/AuthorizedUser';

export const ROOT_QUERY = gql`
  query AllUsers {
    totalUsers
    allUsers { ...userInfo }
    me { ...userInfo }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <AuthorizedUser />
      <Users />
    </BrowserRouter>
  );
};

export default App;
