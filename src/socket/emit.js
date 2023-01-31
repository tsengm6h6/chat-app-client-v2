export const socketEmitEvent = (socket) => {
  return {
    userOnline: (userId) => {
      console.log('user online', userId)
      socket.emit('USER_ONLINE', userId)
    },
    userOffline: (userId) => {
      console.log('user offline', userId)
      socket.emit('USER_OFFLINE', userId)
    },
    sendMessage: () => {},
    updateMessageStatue: () => {},
    userTyping: () => {},
    enterChatRoom: () => {},
    leaveChatRoom: () => {},
    roomCreated: () => {},
    test: () => {
      socket.emit('TEST')
    }
  }
}