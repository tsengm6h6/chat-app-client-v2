import { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../components/MainContainer';
import ChatContactList from './ChatContactList';
import ChatRoom from '../Chat/ChatRoom';
import { useChatContext } from '../../context/ChatContext';
import { useSocketContext } from '../../context/SocketContext';
import { defaultToast } from '../../utils/toastify';

function Home() {
  const { chatId, chatInfo } = useChatContext();
  const {
    socketValue: { roomNotify, invitedNotify },
    resetSocketValue
  } = useSocketContext();

  useEffect(() => {
    if (invitedNotify) {
      defaultToast(invitedNotify);
    }
    return () => {
      resetSocketValue('invitedNotify');
    };
  }, [invitedNotify, resetSocketValue]);

  useEffect(() => {
    if (roomNotify && chatInfo?.chatType === 'room') {
      defaultToast(roomNotify);
    }
    return () => {
      resetSocketValue('roomNotify');
    };
  }, [roomNotify, chatInfo, resetSocketValue]);

  return (
    <OuterWrapper>
      <Wrapper>
        <ChatContainer>
          <ChatContactList />
        </ChatContainer>
        <RoomContainer className={chatId ? 'show' : null}>
          <ChatRoom key={chatId} />
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
  padding: 0 0;

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
  background-color: var(--bg-color-main);

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

export default Home;
