import { createContext, useContext, useState, useEffect } from 'react'
import { fakeRecord } from '../data/fakeRecord'
import { fakeMessage } from '../data/fakeMessage'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAxios } from '../hooks/useAxios'
import { chatAPI } from '../api'
import { useAuthContext } from '../context/AuthContext'

export const ChatContext = createContext({})

export const useChatContext = () => useContext(ChatContext)

export default function ChatContextProvider({ children }) {
  const { user } = useAuthContext()
  const [ chatId, setChatId ] = useLocalStorage('chat-app-chatId', null)
  const [ contacts, setContacts ] = useState([])
  const [ chatMessages, setChatMessages] = useState([])

  const { sendRequest: getUserContacts } = useAxios()
  const { sendRequest: getUserMessages } = useAxios()

  const formatMessages = chatMessages.map(msg => ({
    ...msg,
    senderAvatar: contacts.find(({ _id }) => _id === msg.sender)?.avatarImage
  }))

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

  const handleChatSelect = async ({ id, chatType }) => {
    if (id && id !== chatId) {
      // fetch message
      await getUserMessages(
        {
          method: 'GET',
          url: chatAPI.getUserMessages(
            {
              userId: user._id, 
              chatId: id, 
              type: chatType
            }
          )
        },
        (data) => {
          setChatMessages(data.data)
          console.log(data.data)
        }
      )
      console.log('set chat')
      setChatId(id)
    }
  }

  return (
    <ChatContext.Provider value={{ 
      chatId, 
      setChatId,
      contacts,
      formatMessages,
      handleChatSelect
    }}>
      { children }
    </ChatContext.Provider>
  )
}