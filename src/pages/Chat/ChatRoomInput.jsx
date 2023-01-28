import React, { useState } from 'react'
import styled from 'styled-components'
import { IoSend } from "react-icons/io5";
import { chatAPI } from '../../api'
import { useChatContext } from '../../context/ChatContext'
import { useAuthContext } from '../../context/AuthContext'
import { useAxios } from '../../hooks/useAxios'

function ChatRoomInput({ setChatMessages }) {
  const [ inputMessage, setInputMessage ] = useState('')

  const { user } = useAuthContext()
  const { chatId, chatInfo, contacts, setContacts } = useChatContext()
  const { sendRequest: postUserMessage } = useAxios()
  
  const handleInputSubmit = (e) => {
    e.preventDefault()
    postUserMessage(
      {
        method: 'POST',
        url: chatAPI.postUserMessage({
          userId: user._id, 
          chatId: chatId, 
          type: chatInfo.chatType
        }),
        data: {
          message: inputMessage
        }
      },
      (data) => {
        setChatMessages(prev => [
          ...prev, 
          { ...data.data,  avatarImage: user.avatarImage }
        ])
        const { message, sender, updatedAt } = data.data
        const updatedContact = contacts.map(contact => {
          return contact._id === chatId 
            ? {
                ...contact,
                latestMessage: message,
                latestMessageSender: sender,
                latestMessageUpdatedAt: updatedAt
              } 
            : contact
        })
        setContacts(updatedContact)
      }
    )
    // TODO: socket send message
    setInputMessage('')
  }

  return (
      chatId
      ? (
        <RoomField onSubmit={handleInputSubmit}>
          <RoomInput
            type="text"
            name="inputMessage"
            placeholder='Type something'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <RoomInputButton>
            <ButtonIconWrapper>
              <IoSend/>
            </ButtonIconWrapper>
          </RoomInputButton>
        </RoomField>
      )
      : null
  )
}

const RoomField = styled.form `
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

export default ChatRoomInput