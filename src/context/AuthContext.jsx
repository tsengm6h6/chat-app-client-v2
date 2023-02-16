import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useLocalStorage('chat-app-user', null);
  const [token, setToken] = useLocalStorage('chat-app-token', null);

  return <AuthContext.Provider value={{ user, setUser, token, setToken }}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
