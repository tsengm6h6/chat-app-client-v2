import React, { useState } from 'react'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput'
import { PrimaryButton } from '../../components/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    password: '',
    confirmPassword: ''
  }) 

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit', formData)
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Sign Up</FormTitle>
      <TextInput 
        type="text" 
        placeholder="User Name"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextInput 
        type="email" 
        placeholder="User Email"
        name="useremail"
        id="useremail"
        value={formData.useremail}
        onChange={handleInputChange}
      />
      <TextInput 
        type="password" 
        placeholder="Password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <TextInput 
        type="password" 
        placeholder="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <PrimaryButton>Sign Up</PrimaryButton>
      <LoginSpan>
        Already have an account ? 
        <Link to="/login">
          <span>login</span>
        </Link>
      </LoginSpan>
    </Form>
  )
}

const FormTitle = styled.h1 `
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`

const LoginSpan = styled.p `
  font-size: 0.75rem;

  a {
    text-decoration: none;
  }

  span {
    margin-left: 0.5rem;
    color: var(--danger);
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default SignUpForm