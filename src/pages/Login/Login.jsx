import React from 'react'
import MainContainer from '../../components/MainContainer'
import Navbar from '../../components/Navbar'
import LoginForm from './LoginForm'

function Login() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <LoginForm />
      </MainContainer>
    </>
  )
}

export default Login