// Libraries

// Components
import Navigation from './Navigation'
// Hooks
import { AuthProvider } from '../../hooks/useAuth'

const App = (props) => {
  return (
    <AuthProvider userData={props.user}>
      <Navigation />
    </AuthProvider>
  )
}

export default App
