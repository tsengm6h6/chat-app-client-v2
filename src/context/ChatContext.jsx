import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAxios } from '../hooks/useAxios'
import { chatAPI } from '../api'
import { useAuthContext } from '../context/AuthContext'

export const ChatContext = createContext({})

export const useChatContext = () => useContext(ChatContext)

export default function ChatContextProvider({ children }) {
  const { user } = useAuthContext()
  const [ chatInfo, setChatInfo ] = useLocalStorage('chat-app-chat-info', null)
  const [ contacts, setContacts ] = useState([])

  const { sendRequest: getUserContacts } = useAxios()
  const { sendRequest: updateReadStatus } = useAxios()

  const chatId = chatInfo?._id || null

  useEffect(() => {
    if (user) {
      getUserContacts(
        {
          method: 'GET',
          url: chatAPI.getUserContacts(user._id)
        },
        (data) => {
          setContacts(data.data)
        }
      )
    }
  }, [user])

  const handleChatSelect = async (contact) => {
    if (contact._id !== chatId) {
      setChatInfo(contact)
      updateReadStatus(
        {
          method: 'PUT',
          url: chatAPI.updateReadStatus({
            userId: user._id, 
            chatId: contact._id, 
            type: contact.chatType
          })
        }
      )
    }
  }

  return (
    <ChatContext.Provider value={{ 
      chatId, 
      chatInfo,
      setChatInfo,
      contacts,
      handleChatSelect
    }}>
      { children }
    </ChatContext.Provider>
  )
}