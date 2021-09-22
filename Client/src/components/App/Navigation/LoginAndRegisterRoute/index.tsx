/* eslint-disable @typescript-eslint/no-explicit-any */
// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// Models
import { AppState as AppState_ } from '../../../../redux';
import { UserState as UserState_ } from '../../../../redux/actions/User';

interface Props {
  path: string,
  Component: React.LazyExoticComponent<any>
}

const LoginAndRegisterRoute: FC<Props> = ({ path, Component, ...restOfProps }) => {
  const user = useSelector<AppState_, UserState_>(state => state.user);

  return (
    <Route
      path={path}
      {...restOfProps}
      render={(props) => user?.username ? <Redirect to='/' /> : <Component {...props} />}
    />
  );
};

export default LoginAndRegisterRoute;
