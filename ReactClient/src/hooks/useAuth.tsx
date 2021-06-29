// Libraries
import React, { useState, createContext, useContext } from 'react'

interface AuthContext {
  isLogged: boolean,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  user: any,
  setUser: React.Dispatch<React.SetStateAction<any>>
}

const initialAuthContextState: AuthContext = {
  isLogged: false,
  setIsLogged: () => {},
  user: {},
  setUser: () => {},
}

export const AuthContext = createContext(initialAuthContextState)

export const useAuth = () => useContext(AuthContext)

// ToDo -> Remove Any type
export const AuthProvider = ({ children, userData }: any) => {
  const [isLogged, setIsLogged] = useState(userData ? true : false)
  const [user, setUser] = useState(userData || {})

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
