import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ROOT_QUERY } from '../App';

const Users = () => {
  const { data, loading, error, refetch } = useQuery(ROOT_QUERY);
  if (loading) return 'loading...';
  if (error) return 'errrrrrr';
  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {data.allUsers.map(u => u.name)}
    </div>
  )
}

export default Users;
