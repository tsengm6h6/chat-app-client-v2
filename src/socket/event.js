export const socketListenEvent = (socket, { setSocketValue }) => {
  socket.on("connect", () => {
    setSocketValue(prev => ({
      ...prev,
      socketId: socket.id
    }))
  });

  // user online / offline
  socket.on('ONLINE_USER_CHANGED', (onlineUsers) => {
    setSocketValue(prev => ({
      ...prev,
      onlineUsers
    }))
  })

  // receive message
  socket.on('RECEIVE_MESSAGE', () => {})

  // message has been read
  socket.on('MESSAGE_READ', () => {})

  // someone is typing
  socket.on('TYPING_NOTIFY', () => {})

  // someone enter / leave chat room
  socket.on('CHAT_ROOM_NOTIFY', () => {})

  // someone invited user to room
  socket.on('INVITED_TO_ROOM', () => {})
}