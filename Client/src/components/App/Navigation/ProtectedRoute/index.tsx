/* eslint-disable @typescript-eslint/no-explicit-any */
// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
// Hooks
import Layout from '../../../Layout';
// Models
import { AppState as AppState_ } from '../../../../redux';
import { UserState as UserState_ } from '../../../../redux/actions/User';

interface Props extends RouteProps {
  path: string,
  Component: React.LazyExoticComponent<any>
}

const ProtectedRoute: FC<Props> = ({ path, Component, ...restOfProps }) => {
  const user = useSelector<AppState_, UserState_>(state => state.user);

  return (
    <Route
      path={path}
      {...restOfProps}
      render={(props) => user?.username ? <Layout><Component {...props} /></Layout> : <Redirect to='/login' />}
    />
  );
};

export default ProtectedRoute;
