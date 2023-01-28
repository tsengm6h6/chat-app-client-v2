import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChatRoomHeader from './ChatRoomHeader'
import ChatRoomMessage from './ChatRoomMessage'
import ChatRoomInput from './ChatRoomInput'
import { useChatContext } from '../../context/ChatContext'
import { useAuthContext } from '../../context/AuthContext'
import { chatAPI } from '../../api'
import { useAxios } from '../../hooks/useAxios'

function ChatRoom() {
  const { user } = useAuthContext()
  const { chatId, chatInfo } = useChatContext()
  const { sendRequest: getUserMessages } = useAxios()
  
  const [ chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    if (chatId) {
      getUserMessages(
        {
          method: 'GET',
          url: chatAPI.getUserMessages(
            {
              userId: user._id, 
              chatId: chatId, 
              type: chatInfo.chatType
            }
          )
        },
        (data) => {
          setChatMessages(data.data)
        }
      )
    }
  }, [])

  return (
    <RoomWrapper>
      <ChatRoomHeader />
      <ChatRoomMessage chatMessages={chatMessages} />
      <ChatRoomInput setChatMessages={setChatMessages} />
    </RoomWrapper>
  )
}

const RoomWrapper = styled.div `
  margin: 1rem 0 0;
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

export default ChatRoom