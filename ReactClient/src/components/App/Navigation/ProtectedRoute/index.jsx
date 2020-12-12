// Libraries
import { Route, Redirect } from 'react-router-dom'
// Hooks
import { useAuth } from '../../../../hooks/useAuth'


const ProtectedRoute = ({ path, Component, ...props }) => {
  const { isLogged } = useAuth()

  return (
    <Route path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to="/login" />}
    </Route>
  )
}

export default ProtectedRoute
