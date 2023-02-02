export const socketEmitEvent = (socket) => {
  return {
    userOnline: (userId) => {
      socket.emit('USER_ONLINE', userId)
    },
    userOffline: (userId) => {
      socket.emit('USER_OFFLINE', userId)
    },
    sendMessage: (messageData) => {
      // type, message, senderId, receiverId
      console.log('=== socket 送出訊息 ===')
      console.log('send message emit', messageData)
      socket.emit('SEND_MESSAGE', messageData)
    },
    updateMessageStatus: (updatedData) => {
      console.log('socket 告知對方「自己」已讀', updatedData)
      socket.emit('UPDATE_MESSAGE_STATUS', updatedData)
    },
    userTyping: () => {},
    enterChatRoom: () => {},
    leaveChatRoom: () => {},
    roomCreated: () => {},
    test: () => {
      socket.emit('TEST')
    }
  }
}