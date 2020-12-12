// Libraries
import { useState, createContext, useContext } from 'react'
// Services

const initialAuthContextState = {
  isLogged: false,
  isAuthLoading: true,
}

export const AuthContext = createContext(initialAuthContextState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children, userData }) => {
  const [isLogged, setIsLogged] = useState(userData ? true : false)
  const [user, setUser] = useState(userData || {})

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
