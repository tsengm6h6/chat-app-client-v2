import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './utils/style';
import Navbar from './components/Navbar';
import Home from './pages/Chat/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Room from './pages/Room/Room';
import './App.css';
import ChatContextProvider from './context/ChatContext';
import { useSocketContext } from './context/SocketContext';
import { useAuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { socketEmitEvent } from './socket/emit';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const { user } = useAuthContext();
  const [mode, setMode] = useLocalStorage('chat-app-mode', 'light');

  const {
    socketConnect,
    socketValue: { socket, socketId }
  } = useSocketContext();

  useEffect(() => {
    if (user && !socketId) {
      socketConnect();
    }
  }, [user, socketId, socketConnect]);

  useEffect(() => {
    if (user && socketId) {
      socketEmitEvent(socket).userOnline(user._id, socketId);
    }
  }, [socketId, socket, user]);

  return (
    <ThemeProvider theme={{ mode, setMode }}>
      <ChatContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace={true} />} />
          <Route path="/open-room" element={user ? <Room /> : <Navigate to="/login" replace={true} />} />
          <Route path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <SignUp />} />
        </Routes>
        <GlobalStyle />
        <ToastContainer />
      </ChatContextProvider>
    </ThemeProvider>
  );
}

export default App;
