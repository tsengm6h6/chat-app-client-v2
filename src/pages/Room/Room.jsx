import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/MainContainer'
import { useChatContext } from '../../context/ChatContext'
import RoomSelectList from './RoomSelectList'
import RoomForm from './RoomForm'
import { useAxios } from '../../hooks/useAxios'
import { chatAPI } from '../../api'

function Room() {
  const { chatId } = useChatContext()
  const [ show, setShow ] = useState()
  
  const { error, isLoading, sendRequest: postCreateRoom } = useAxios()

  const handleRoomCreate = (formData) => {
    console.log(formData)
    setShow(prev => !prev)
    postCreateRoom(
      {
        method: 'POST',
        url: chatAPI.postCreateRoom
      },
      (data) => {
        console.log('create room', data)
      }
    )
  }

  return (
    <Wrapper>
      <ChatContainer>
        <RoomSelectList setShow={setShow} />
      </ChatContainer>
      <RoomContainer className={show ? 'show' : null}>
        <RoomForm handleRoomCreate={handleRoomCreate} />
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
  /* background-color: palevioletred; */

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

export default Room