import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../context/ChatContext'
import ChatMessage from '../Chat/ChatMessage'

function ChatRoomMessage({ chatMessages }) {
  const { chatId } = useChatContext()

  const msgRef = useRef(null)

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView()
    }
  }, [chatMessages])

  const renderedMessage = chatMessages.map(msg => {
    return (
      <ChatMessage key={msg._id} {...msg} ref={msgRef} />
    )
  })
  
  return (
    <RoomMessage>
      { chatId 
        ? renderedMessage 
        : (
          <RoomWelcomMessage>
            Select a user to start a chat
          </RoomWelcomMessage>
        )
      }
    </RoomMessage>
  )
}

const RoomMessage = styled.div `
  flex: 1;
  overflow: auto;
  padding: 1.5rem 1.5rem 0.5rem;
`

const RoomWelcomMessage = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color-main);
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
`

export default ChatRoomMessage