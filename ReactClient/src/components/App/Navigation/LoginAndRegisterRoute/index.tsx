// Libraries
import { LoadableComponent } from '@loadable/component'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
// Models
import { AppState as AppState_ } from '../../../../redux'
import { AuthState as AuthState_ } from '../../../../redux/actions/Auth'

interface Props {
  path: string,
  Component: LoadableComponent<any>
}

const LoginAndRegisterRoute: FC<Props> = ({ path, Component, ...props }) => {
  const { authState: { isAuthenticated } } = useSelector<AppState_, { authState: AuthState_ }>(state => ({ authState: state.authState }));

  return (
    <Route path={path}>
      {isAuthenticated ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  )
}

export default LoginAndRegisterRoute
