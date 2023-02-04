import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import MainContainer from '../../components/MainContainer';
import Form from '../../components/Form';
import AvatarUploader from '../../components/AvatarUploader';
import { PrimaryButton } from '../../components/Button';
import TextInput from '../../components/TextInput';
import styled from 'styled-components';
import { useAxios } from '../../hooks/useAxios';
import { avatarGenerator } from '../../utils/avatarGenerator';
import { warningToast } from '../../utils/toastify';

function RoomForm({ handleRoomCreate, isLoading }) {
  const [formData, setFormData] = useState({
    roomname: '',
    avatarImage: ''
  });

  const { error: avatarError, isLoading: avatarLoading, sendRequest: fetchRandomAvatar } = useAxios();

  const generateAvatar = useCallback(() => {
    avatarGenerator(fetchRandomAvatar, (avatar) => {
      setFormData((prev) => ({
        ...prev,
        avatarImage: avatar
      }));
    });
  }, [fetchRandomAvatar]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.roomname) return warningToast('Room name is required!');
    handleRoomCreate(formData);
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
    <MainContainer>
      <Form onSubmit={(e) => handleFormSubmit(e)}>
        <FormTitle>Enter Room Details</FormTitle>
        <TextInput
          type="text"
          placeholder="Room Name"
          name="roomname"
          id="roomname"
          value={formData.roomname}
          onChange={(e) => setFormData((prev) => ({ ...prev, roomname: e.target.value }))}
        />
        <AvatarUploader
          error={avatarError}
          isLoading={avatarLoading}
          avatar={formData.avatarImage}
          onGenerate={handleGenerate}
        />
        <PrimaryButton>{isLoading ? 'Loading...' : 'Confirm'}</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

RoomForm.propTypes = {
  handleRoomCreate: PropTypes.func,
  isLoading: PropTypes.bool
};

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

export default RoomForm;
