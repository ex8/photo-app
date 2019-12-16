import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GITHUB_AUTH_MUTATION = gql`
  mutation GitHubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

const AuthorizedUser = ({ history }) => {
  const [processing, setProcessing] = useState(false);
  const [githubAuth, { data }] = useMutation(GITHUB_AUTH_MUTATION);

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setProcessing(true);
      const code = window.location.search.replace("?code=", "");
      alert(code);
      history.replace('/');
    }
  }, []);

  const requestCode = () => {
    const clientID = process.env.REACT_APP_GITHUB_CID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  return (
    <div>
      <button onClick={requestCode()} disabled={processing}>
        Sign in with GitHub
      </button>
    </div>
  )
}

export default withRouter(AuthorizedUser);
