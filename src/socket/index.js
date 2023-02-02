import { io } from "socket.io-client";
import { socketListenEvent } from './event'
import { socketEmitEvent } from "./emit";

export const initSocket = ({ setSocketValue, setSocketEmitEvent, INIT_SOCKET_STATE }) => {
  const socket = io(process.env.VITE_SERVER_URL);

  socketListenEvent(socket, { setSocketValue })

  const allowedEvents = socketEmitEvent(socket)
  setSocketEmitEvent(allowedEvents)

  return {
    socket,
    disconnect: () => {
      console.log('DISCONNECT')
      setSocketValue(INIT_SOCKET_STATE)
      socket.disconnect()
    }
  }
}