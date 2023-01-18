import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/MainContainer'
import Navbar from '../../components/Navbar'
import ChatRecordList from '../Chat/ChatRecordList'
import ChatRoom from '../Chat/ChatRoom'

function Home() {
  const [chatId, setChatId] = useState('hi')
  const [show, setShow] = useState(false)

  return (
    <>
      <Navbar />
      <Wrapper>
        <ChatContainer onClick={() => setShow(true)}>
          <ChatRecordList />
        </ChatContainer>
        <RoomContainer 
          onClick={() => setShow(false)}
          className={show ? 'show' : null}>
          <ChatRoom />
        </RoomContainer>
      </Wrapper>
    </>
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
  padding: 2rem 0 1rem;

  @media screen and (min-width: 768px) {
    max-width: calc(480px + 2rem);
  }
`

const RoomContainer = styled(ChatContainer) `
  padding: 0 1rem;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(100%) scale(0, 1);
  transform-origin: right;
  opacity: 0;
  transition: 0.3s all ease-in-out;

  &.show {
    transform: translateX(0) scale(1, 1);
    opacity: 1;
  }

  @media screen and (min-width: 768px) {
    position: relative;
    transform: translateX(0) scale(1, 1);
    opacity: 1;
    max-width: 100%;
  }
`

export default Home