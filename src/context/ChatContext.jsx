import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAxios } from '../hooks/useAxios'
import { chatAPI } from '../api'
import { useAuthContext } from '../context/AuthContext'
import { useSocketContext } from '../context/SocketContext'
import { socketEmitEvent } from '../socket/emit'

export const ChatContext = createContext({})

export const useChatContext = () => useContext(ChatContext)

export default function ChatContextProvider({ children }) {
  const { user } = useAuthContext()
  const { socketValue: { socket, onlineUsers, messageData } } = useSocketContext()
  const [ chatInfo, setChatInfo ] = useLocalStorage('chat-app-chat-info', null)
  const [ contacts, setContacts ] = useState([])
  const [ contactsWithNewMessage, setContactsWithNewMessage ] = useState(contacts)

  const { sendRequest: getUserContacts } = useAxios()
  const { sendRequest: updateReadStatus } = useAxios()

  const chatId = chatInfo?._id || null
  const contactsWithOnlineStatus = contacts.map(contact => ({
    ...contact,
    isOnline: onlineUsers?.some(user => user.userId === contact._id) || false,
  }))

  // fetch user contacts
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

  // 更新最新訊息
  const updateContactLatestMessage = (latestMessageData) => {
    const { updateId, sender, message, updatedAt, unreadCount } = latestMessageData
    console.log('== updateContactLatestMessage ==', latestMessageData)
    setContacts(prevContact => prevContact.map(contact => {
      return contact._id === updateId 
      ? {
        ...contact,
        latestMessage: message, 
        latestMessageSender: sender, 
        latestMessageUpdatedAt: updatedAt,
        unreadCount: chatId === sender ? 0 : unreadCount 
      } : contact
    }))
  }

  // 有新訊息時，更新 contact 最新訊息
  useEffect(() => {
    if (messageData) {
      console.log('== chat context get msg ==', messageData)
      updateContactLatestMessage({ ...messageData, updateId: messageData.sender })
    }
  }, [messageData])

  // 通知對方自己已讀
  const updateMessageStatusToRead = (chatId, type) => {
    // API 更新對方發出的訊息為已讀
    updateReadStatus(
      {
        method: 'PUT',
        url: chatAPI.updateReadStatus({
          userId: user._id, 
          chatId, 
          type
        })
      }
    )
    // socket 告知對方「自己」已讀
    socketEmitEvent(socket).updateMessageStatus({ 
      readerId: user._id,
      messageSender: chatId,
      type,
    })
  }


  const handleChatSelect = async (selected) => {
    if (selected._id !== chatId) {
      setChatInfo(selected)
      updateMessageStatusToRead(selected._id, selected.chatType)
      setContacts(prevContacts => prevContacts.map(
        prev => prev._id === selected._id ? { ...prev, unreadCount: 0 } : prev
      ))
    }
  }

  return (
    <ChatContext.Provider value={{ 
      chatId, 
      chatInfo,
      setChatInfo,
      setContacts,
      handleChatSelect,
      contactsWithOnlineStatus,
      updateContactLatestMessage,
      updateMessageStatusToRead
    }}>
      { children }
    </ChatContext.Provider>
  )
}