// Libraries
import { Route, Redirect } from 'react-router-dom'
// Hooks
import { useAuth } from '../../../../hooks/useAuth'
import Layout from '../../../Layout'

const ProtectedRoute = ({ path, Component, ...props }) => {
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
