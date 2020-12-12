// Libraries

// Components
import Navigation from './Navigation'
// Hooks
import {AuthProvider} from '../../hooks/useAuth'

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
