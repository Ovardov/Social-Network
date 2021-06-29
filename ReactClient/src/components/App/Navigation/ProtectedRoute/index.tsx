// Libraries
import { LoadableComponent } from '@loadable/component'
import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
// Hooks
import { useAuth } from '../../../../hooks/useAuth'
import Layout from '../../../Layout'

interface Props extends RouteProps {
  path: string,
  Component: LoadableComponent<any>
  postData: any
}

const ProtectedRoute: FC<Props> = ({ path, Component, ...props }) => {
  const { isLogged } = useAuth()

  return (
    <Route path={path}>
      {isLogged ? (
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
