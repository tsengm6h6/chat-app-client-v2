import React, { useState, useEffect } from 'react'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput'
import AvatarUploader from './AvatarUploader'
import { PrimaryButton } from '../../components/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import { Buffer } from 'buffer'
import { warningToast } from '../../utils/toastify'

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    password: '',
    confirmPassword: '',
    avatarImage: ''
  })

  const allowSubmit = () => {
    const {
      username,
      useremail,
      password,
      confirmPassword,
      avatarImage
    } = formData

    const checkArray = [username, useremail, password, confirmPassword, avatarImage]
    if (checkArray.some(el => el === '')) {
      warningToast('All fields are required!')
      return false
    }
    if (password !== confirmPassword) {
      warningToast('Password is not equal to confirm password.')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = allowSubmit()
    if (isValid) {
      console.log('submit', formData)
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const { error, isLoading, sendRequest: fetchRandomAvatar } = useAxios()
  const genRandomNum = () => Math.floor(Math.random() * 1000)
  const AVATAR_API = `https://api.multiavatar.com/${genRandomNum()}?apikey=${process.env.VITE_AVATAR_KEY}`
  const generateAvatar = () => {
    fetchRandomAvatar(
      {
        method: 'GET',
        url: AVATAR_API
      },
      (data) => {
        const result = Buffer.from(data)
        setFormData(prev => ({
          ...prev,
          avatarImage: result.toString('base64')
        }))
      }
    )
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    generateAvatar()
  }

  useEffect(() => {
    generateAvatar()
  }, [])

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
      <AvatarUploader 
        error={error}
        isLoading={isLoading}
        avatar={formData.avatarImage} 
        onGenerate={handleGenerate} 
      />
      <PrimaryButton disabled={isLoading}>Sign Up</PrimaryButton>
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