// Components
import Navigation from './Navigation'
// Hooks
import { AuthProvider } from '../../hooks/useAuth'

const App = (props) => {
  return (
    <AuthProvider userData={props.user}>
      <Navigation postData={props.posts} />
    </AuthProvider>
  )
}

export default App
