import React, { createContext, useContext, useState } from 'react'
import { initSocket } from '../socket'

const INIT_SOCKET_STATE = {
  socketId: null,
  onlineUsers: null
}

const SocketContext = createContext(INIT_SOCKET_STATE)
export const useSocketContext = () => useContext(SocketContext)

export default function SocketContextProvider({ children }) {
  const [socketValue, setSocketValue] = useState(INIT_SOCKET_STATE)
  const [socketEmitEvent, setSocketEmitEvents] = useState({})

  const socketConnect = () => {
    return initSocket({ setSocketValue, setSocketEmitEvents, INIT_SOCKET_STATE })
  }

  return (
    <SocketContext.Provider value={{ socketConnect, socketValue, socketEmitEvent }}>
      { children }
    </SocketContext.Provider>
  )
}