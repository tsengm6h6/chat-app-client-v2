import { createContext, useContext, useState } from 'react'
import { fakeRecord } from '../data/fakeRecord'
import { fakeMessage } from '../data/fakeMessage'

export const ChatContext = createContext({})

export const useChatContext = () => useContext(ChatContext)

export default function ChatContextProvider({ children }) {
  const [chatId, setChatId] = useState(null)

  // 從 record 找出 userInfo
  const chatRoomInfo = fakeRecord.find(({ id }) => id === chatId) || null

  // 打 api 拿 message 歷史訊息
  // 這裡用 message 代替
  const chatMessage = fakeMessage

  return (
    <ChatContext.Provider value={{ 
      chatId, 
      setChatId,
      chatRoomInfo,
      chatMessage
    }}>
      { children }
    </ChatContext.Provider>
  )
}