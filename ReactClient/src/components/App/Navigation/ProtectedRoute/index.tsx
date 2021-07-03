// Libraries
import { LoadableComponent } from '@loadable/component'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
// Hooks
import Layout from '../../../Layout'
// Models
import { AppState as AppState_ } from '../../../../redux'
import { AuthState as AuthState_ } from '../../../../redux/actions/Auth'

interface Props extends RouteProps {
  path: string,
  Component: LoadableComponent<any>
  postData: any
}

const ProtectedRoute: FC<Props> = ({ path, Component, ...props }) => {
  const { authState: { isAuthenticated } } = useSelector<AppState_, { authState: AuthState_ }>(state => ({ authState: state.authState }));

  return (
    <Route path={path}>
      {isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  )
}

export default ProtectedRoute
