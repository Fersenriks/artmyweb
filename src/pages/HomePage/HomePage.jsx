import React from 'react';

import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/actions/users';
import { routes } from '../../constants';

import './home-page.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getUsers = () => {
    dispatch(fetchUsers(1));
    history.push(routes.USERS);
  };

  return (
    <div className={'home-page'}>
      <Button onClick={getUsers} type='primary'>
        Show users
      </Button>
    </div>
  );
};

export default HomePage;
