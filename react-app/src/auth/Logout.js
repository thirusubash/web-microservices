import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/actions/types';
import { Button } from '@mui/material';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};

export default Logout;
