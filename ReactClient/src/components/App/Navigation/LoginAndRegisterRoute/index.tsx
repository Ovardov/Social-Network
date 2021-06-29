// Libraries
import { LoadableComponent } from '@loadable/component'
import React, { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
// Hooks
import { useAuth } from '../../../../hooks/useAuth'

interface Props {
  path: string,
  Component: LoadableComponent<any>
}

const LoginAndRegisterRoute: FC<Props> = ({ path, Component, ...props }) => {
  const { isLogged } = useAuth()

  return (
    <Route path={path}>
      {isLogged ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  )
}

export default LoginAndRegisterRoute
