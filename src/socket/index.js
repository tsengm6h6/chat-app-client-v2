import { io } from "socket.io-client";

export const initSocket = ({ setSocketId }) => {
  const socket = io(process.env.VITE_SERVER_URL);

  socket.on("connect", () => {
    console.log('connect', socket.id)
    setSocketId(socket.id)
  });

  return {
    disconnect: () => {
      console.log('DIS')
      socket.disconnect()
      setSocketId(null)
    }
  }
}