import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../components/MainContainer';
import { useChatContext } from '../../context/ChatContext';
import RoomSelectList from './RoomSelectList';
import RoomForm from './RoomForm';
import { useAxios } from '../../hooks/useAxios';
import { chatAPI } from '../../api';
import { useAuthContext } from '../../context/AuthContext';
import { errorToast } from '../../utils/toastify';
import { useNavigate } from 'react-router-dom';
import { socketEmitEvent } from '../../socket/emit';
import { useSocketContext } from '../../context/SocketContext';

function Room() {
  const [show, setShow] = useState();

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { contacts, fetchUserContacts, setChatInfo } = useChatContext();
  const {
    socketValue: { socket }
  } = useSocketContext();
  const { error, isLoading, sendRequest: postCreateRoom } = useAxios();

  const [selected, setSelected] = useState([]);
  const options = contacts
    .filter((contact) => contact.chatType !== 'room')
    .map((contact) => ({ ...contact, isSelected: selected.includes(contact._id) }));

  const handleSelected = (selectedId) => {
    selected.includes(selectedId)
      ? setSelected((prev) => prev.filter((id) => id !== selectedId))
      : setSelected((prev) => [...prev, selectedId]);
  };

  const handleRoomCreate = (formData) => {
    postCreateRoom(
      {
        method: 'POST',
        url: chatAPI.postCreateRoom(user._id),
        data: {
          name: formData.roomname.trim(),
          users: selected,
          avatarImage: formData.avatarImage
        }
      },
      (data) => {
        fetchUserContacts();
        setChatInfo(data.data);
        socketEmitEvent(socket).roomCreated({
          name: formData.roomname.trim(),
          creator: user.name,
          invitedUser: selected
        });
        navigate('/');
      }
    );
  };

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    if (error) errorToast(error.message);
  }, [error]);

  return (
    <OuterWrapper>
      <Wrapper>
        <ChatContainer>
          <RoomSelectList handleSelected={handleSelected} options={options} toggleShow={toggleShow} />
        </ChatContainer>
        <RoomContainer className={show ? 'show' : null}>
          <RoomForm handleRoomCreate={handleRoomCreate} isLoading={isLoading} toggleShow={toggleShow} />
        </RoomContainer>
      </Wrapper>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ChatContainer = styled(Container)`
  height: calc(100vh - 80px);
  background-color: var(--bg-color-main);
  align-items: flex-start;
  padding: 40px 0 0 0;
  min-height: none;

  @media screen and (min-width: 768px) {
    max-width: calc(480px + 2rem);
  }
`;

const RoomContainer = styled(ChatContainer)`
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: translateX(100%) scale(1, 1);
  transform-origin: right;
  transition: transform 0.3s ease-in-out;

  &.show {
    transform: translateX(0) scale(1, 1);
  }

  @media screen and (min-width: 768px) {
    position: relative;
    transform: translateX(0) scale(1, 1);
    transition: none;
    max-width: 100%;
  }
`;

export default Room;
