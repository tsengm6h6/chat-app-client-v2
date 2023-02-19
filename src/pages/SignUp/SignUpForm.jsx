import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import AvatarUploader from '../../components/AvatarUploader';
import { PrimaryButton } from '../../components/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { errorToast, warningToast } from '../../utils/toastify';
import { authAPI } from '../../api';
import { useAuthContext } from '../../context/AuthContext';
import { useAvatar } from '../../hooks/useAvatar';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarImage: ''
  });
  const { setUser, setToken } = useAuthContext();

  const { error: submitError, isLoading: submitLoading, sendRequest: postRegister } = useAxios();
  const { error: avatarError, isLoading: avatarLoading, fetchAvatar } = useAvatar();

  useEffect(() => {
    if (submitError?.errors) {
      submitError.errors.forEach((e) => {
        errorToast(e.msg);
      });
    } else if (submitError?.message) {
      errorToast(submitError.message);
    }
  }, [submitError]);

  const generateAvatar = useCallback(async () => {
    const avatar = await fetchAvatar();
    setFormData((prev) => ({
      ...prev,
      avatarImage: avatar
    }));
  }, [fetchAvatar]);

  const submitValidator = () => {
    const { username, email, password, confirmPassword, avatarImage } = formData;

    const checkArray = [username, email, password, confirmPassword, avatarImage];
    if (checkArray.some((el) => el === '')) {
      warningToast('All fields are required!');
      return false;
    }
    if (password !== confirmPassword) {
      warningToast('Password is not equal to confirm password.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = submitValidator();
    if (isValid) {
      postRegister(
        {
          method: 'POST',
          url: authAPI.register,
          data: { ...formData }
        },
        (data) => {
          const { accessToken, ...other } = data.data;
          setUser({ ...other });
          setToken({ accessToken });
        }
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    generateAvatar();
  };

  useEffect(() => {
    generateAvatar();
  }, [generateAvatar]);

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
        name="email"
        id="email"
        value={formData.email}
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
        error={avatarError}
        isLoading={avatarLoading}
        avatar={formData.avatarImage}
        onGenerate={handleGenerate}
      />
      <PrimaryButton disabled={avatarLoading}>{submitLoading ? 'Submitting...' : 'Sign Up'}</PrimaryButton>
      <LoginSpan>
        Already have an account ?
        <Link to="/login">
          <span>login</span>
        </Link>
      </LoginSpan>
    </Form>
  );
}

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

const LoginSpan = styled.p`
  font-size: 0.75rem;

  a {
    text-decoration: none;
  }

  span {
    margin-left: 0.5rem;
    color: var(--danger);
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SignUpForm;
