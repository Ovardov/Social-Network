import { useState, useEffect, createContext, useContext } from 'react'
import { checkAuth } from '../services/authService'

const initialAuthContextState = {
  isLogged: false
}

export const AuthContext = createContext(initialAuthContextState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        // Verify that the current user is authenticated
        await checkAuth()
        setIsLogged(true);

      } catch (err) {
        console.error('Error while init auth data', err);
      }
    }

    initData()
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  )
}