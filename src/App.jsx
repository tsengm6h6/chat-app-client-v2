import { useState } from 'react'
import styled from "styled-components"
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {
  const [user, setUser] = useState(null) 

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace={true} /> } />
      <Route path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <SignUp />} />
    </Routes>
  )
}

export default App
