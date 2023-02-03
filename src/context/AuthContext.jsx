import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useLocalStorage('chat-app-user', null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  )
}