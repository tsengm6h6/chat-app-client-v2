import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  )
}