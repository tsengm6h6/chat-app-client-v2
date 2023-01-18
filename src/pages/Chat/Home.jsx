import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/MainContainer'
import ChatRecordList from '../Chat/ChatRecordList'
import ChatRoom from '../Chat/ChatRoom'
import { useChatContext } from '../../context/ChatContext'

function Home() {
  const { chatId } = useChatContext()
  console.log(chatId)

  return (
    <Wrapper>
      <ChatContainer>
        <ChatRecordList />
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
  transform: translateX(100%) scale(0, 1);
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