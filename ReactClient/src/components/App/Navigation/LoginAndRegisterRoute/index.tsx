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

const LoginAndRegisterRoute: FC<Props> = ({ path, Component, ...props }) => {
  const user = useSelector<AppState_, UserState_>(state => state.user);

  return (
    <Route path={path}>
      {user?.username ? <Redirect to='/' /> : <Component {...props} />}
    </Route>
  );
};

export default LoginAndRegisterRoute;
