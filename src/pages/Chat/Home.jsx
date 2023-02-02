import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/MainContainer'
import ChatContactList from './ChatContactList'
import ChatRoom from '../Chat/ChatRoom'
import { useChatContext } from '../../context/ChatContext'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'

function Home() {
  const { chatId } = useChatContext()
  const { user } = useAuthContext()
  const { socketConnect, socketValue: { socketId }, socketEmitEvent } = useSocketContext()

  useEffect(() => {
    const { disconnect } = socketConnect()
    return () => {
      disconnect() // TODO: 移到 APP 連線，避免 cleanup 就斷線
    }
  }, [])

  useEffect(() => {
    if(socketId) {
      socketEmitEvent.userOnline(user._id)
    }
  }, [socketId])

  return (
    <Wrapper>
      <ChatContainer>
        <ChatContactList />
      </ChatContainer>
      <RoomContainer className={chatId ? 'show' : null}>
        <ChatRoom key={chatId} />
      </RoomContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const ChatContainer = styled(Container) `
  overflow: auto;
  height: calc(100vh - 80px);
  background-color: var(--bg-color-main);
  align-items: flex-start;
  padding: 0 0 ;

  @media screen and (min-width: 768px) {
    max-width: calc(480px + 2rem);
  }
`

const RoomContainer = styled(ChatContainer) `
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
`

export default Home