// Libraries
import { useState, useEffect, createContext, useContext } from 'react'
// Services
import { checkAuth } from '../services/authService'

const initialAuthContextState = {
  isLogged: false,
  isAuthLoading: true,
}

export const AuthContext = createContext(initialAuthContextState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const initData = async () => {
      try {
        // Verify that the current user is authenticated
        await checkAuth()
        setIsLogged(true);

      } catch (err) {
        console.error('Error while init auth data', err);
      }

      setIsAuthLoading(false)
    }

    initData()
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged, isAuthLoading, setIsLogged }}>{children}</AuthContext.Provider>
  )
}