// Libraries
import { Route, Redirect } from 'react-router-dom'
// Hooks
import { useAuth } from '../../../../hooks/useAuth'


const LoginAndRegisterRoute = ({ path, Component, ...props }) => {
  const { isLogged } = useAuth()

  return (
    <Route path={path}>
      {isLogged ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  )
}

export default LoginAndRegisterRoute
