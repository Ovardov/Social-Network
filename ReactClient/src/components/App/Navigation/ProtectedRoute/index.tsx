// Libraries
import { LoadableComponent } from '@loadable/component';
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
  Component: LoadableComponent<any>
}

const ProtectedRoute: FC<Props> = ({ path, Component, ...props }) => {
  const user = useSelector<AppState_, UserState_>(state => state.user);

  return (
    <Route path={path}>
      {user?.username ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to='/login' />
      )}
    </Route>
  );
};

export default ProtectedRoute;
