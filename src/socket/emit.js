export const socketEmitEvent = (socket) => {
  return {
    userOnline: (userId, socketId) => {
      socket.emit('USER_ONLINE', userId, socketId);
    },
    userOffline: (userId) => {
      socket.emit('USER_OFFLINE', userId);
    },
    sendMessage: (messageData) => {
      // type, message, senderId, receiverId
      console.log('=== socket 送出訊息 ===');
      console.log('send message emit', messageData);
      socket.emit('SEND_MESSAGE', messageData);
    },
    updateMessageStatus: (updatedData) => {
      console.log('socket 告知對方「自己」已讀', updatedData);
      socket.emit('UPDATE_MESSAGE_STATUS', updatedData);
    },
    updateMessageReaders: (updatedData) => {
      console.log('socket 更新已讀', updatedData);
      socket.emit('UPDATE_MESSAGE_READERS', updatedData);
    },
    userTyping: (typingNotify) => {
      console.log('=== user typing ===', typingNotify);
      socket.emit('USER_TYPING', typingNotify);
    },
    enterChatRoom: (data) => {
      console.log('=== enter chat room ===', data);
      socket.emit('ENTER_CHAT_ROOM', data);
    },
    leaveChatRoom: (data) => {
      console.log('=== leave chat room ===', data);
      socket.emit('LEAVE_CHAT_ROOM', data);
    },
    roomCreated: (data) => {
      console.log('** create room **', data);
      socket.emit('ROOM_CREATED', data);
    }
  };
};
