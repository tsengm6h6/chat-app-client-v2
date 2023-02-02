import React, { createContext, useContext, useState } from 'react'
import { initSocket } from '../socket'

const INIT_SOCKET_STATE = {
  socketId: null,
  onlineUsers: null,
  messageData: null,
  messageReadStatus: null,
  typingNotify: null
}

const SocketContext = createContext(INIT_SOCKET_STATE)
export const useSocketContext = () => useContext(SocketContext)

export default function SocketContextProvider({ children }) {
  const [socketValue, setSocketValue] = useState(INIT_SOCKET_STATE)
  const [socketEmitEvent, setSocketEmitEvent] = useState({})

  const socketConnect = () => {
    return initSocket({ setSocketValue, setSocketEmitEvent, INIT_SOCKET_STATE })
  }

  return (
    <SocketContext.Provider value={{ socketConnect, socketValue, setSocketValue,  socketEmitEvent }}>
      { children }
    </SocketContext.Provider>
  )
}