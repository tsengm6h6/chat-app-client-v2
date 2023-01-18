import React, { useState } from 'react'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput'
import { PrimaryButton } from '../../components/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import { authAPI } from '../../api'

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  }) 

  const { error, isLoading, sendRequest: postLogin } = useAxios()

  const handleSubmit = (e) => {
    e.preventDefault()
    postLogin(
      {
        method: 'POST',
        url: authAPI.login,
        body: formData
      },
      (data) => console.log(data)
    )
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Login</FormTitle>
      <TextInput 
        type="text" 
        placeholder="User Name"
        name="username"
        id="username"
        value={formData.username}
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
      <PrimaryButton>Login</PrimaryButton>
      <LoginSpan>
        Do not have an account ? 
        <Link to="/signup">
          <span>sign up</span>
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

export default LoginForm