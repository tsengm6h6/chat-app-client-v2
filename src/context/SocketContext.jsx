import React, { createContext, useContext, useState } from 'react'
import { initSocket } from '../socket'


const SocketContext = createContext({})
export const useSocket = () => useContext(SocketContext)

export default function SocketContextProvider({ children }) {
  const [socketId, setSocketId] = useState(null)

  const socketConnect = () => {
    return initSocket({ setSocketId })
  }

  return (
    <SocketContext.Provider value={{ socketConnect, socketId }}>
      { children }
    </SocketContext.Provider>
  )
}