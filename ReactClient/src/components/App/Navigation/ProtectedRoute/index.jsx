// Libraries
import { Route, Redirect } from 'react-router-dom'
// Components

// Hooks
import { useAuth } from '../../../../hooks/useAuth'
// Services

// Utils

// Styles

const ProtectedRoute = ({ path, Component, ...props }) => {
  const { isLogged } = useAuth()

  return (
    <Route path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to="/login" />}
    </Route>
  )
}

export default ProtectedRoute
