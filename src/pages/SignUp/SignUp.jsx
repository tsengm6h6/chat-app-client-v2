import React from 'react'
import Navbar from '../../components/Navbar'
import MainContainer from '../../components/MainContainer'
import SignUpForm from './SignUpForm'

function SignUp() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <SignUpForm />
      </MainContainer>
    </>
  )
}

export default SignUp