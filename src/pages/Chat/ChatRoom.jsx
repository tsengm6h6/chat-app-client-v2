import React from 'react'
import styled from 'styled-components'
import { fakeMessage } from '../../data/fakeMessage'
import ChatMessage from '../Chat/ChatMessage'
import { IoArrowUndo, IoSend } from "react-icons/io5";
import { MultiAvatar } from '../../components/Avatar';

function ChatRoom() {
  const renderedMessage = fakeMessage.map(msg => {
    return (
      <ChatMessage key={msg.id} {...msg} />
    )
  })
  return (
    <RoomWrapper>
      <RoomHeader>
        <HeaderIcon>
          <IconWrapper>
            <IoArrowUndo />
          </IconWrapper>
        </HeaderIcon>
        <HeaderName>John Doe</HeaderName>
        <HeaderMembers>
          <MultiAvatar size="small" src="/vite.svg" />
          <MultiAvatar size="small" src="/talking.png" />
          <MultiAvatar size="small" src="/vite.svg" />
          <MultiAvatar size="small" src="/vite.svg" />
        </HeaderMembers>
      </RoomHeader>
      <RoomMessage>
        {renderedMessage}
        {renderedMessage}
        {renderedMessage}
      </RoomMessage>
      <RoomField>
        <RoomInput />
        <RoomInputButton>
          <ButtonIconWrapper>
            <IoSend/>
          </ButtonIconWrapper>
        </RoomInputButton>
      </RoomField>
    </RoomWrapper>
  )
}

const RoomWrapper = styled.div `
  margin: 1rem 0;
  width: 100%;
  height: calc(100% - 1rem);
  background-color: var(--bg-color-main);
  border-top-left-radius: 20px;
  border-top-right-radius: 8px;
  border: 2px solid var(--bg-color-darken);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const RoomHeader = styled.div `
  padding: 0 1rem;
  height: 60px;
  background-color: var(--bg-color-darken);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  gap: 0.5rem;
`

const RoomMessage = styled.div `
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
`

const RoomField = styled.div `
  margin: 0.5rem;
  height: 55px;
  background-color: var(--bg-color-darken);
  border-radius: 20px;
  display: flex;
  align-items: center;
`

const RoomInput = styled.input `
  flex: 1;
  padding: 1rem 0;
  margin: 0 0.5rem 0 1rem;
  border-radius: 20px;
  border: none;
  background-color: transparent;
  color: var(--main-color);
  outline: none;
  font-size: 1rem;
`

const RoomInputButton = styled.button `
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  background-color: var(--primary);
  color: var(--bg-color-main);
  outline: none;
  border: none;
`

const IconWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonIconWrapper = styled(IconWrapper) `
  font-size: 1.15rem;
  transform: rotate(-40deg);
  padding-left: 6px;
  cursor: pointer;
`

const HeaderIcon = styled.div `
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  justify-self: flex-start;
  font-size: 1.25rem;
  color: var(--primary);
  margin: 0;
  cursor: pointer;
`

const HeaderName = styled.h2 `
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  font-size: 1.25rem;
  justify-self: center;
`
const HeaderMembers = styled.div `
  grid-column: 4 / 5;
  grid-row: 1 / 3;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ChatRoom