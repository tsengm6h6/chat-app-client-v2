export const socketListenEvent = (socket, { setSocketValue }) => {
  socket.on('connect', () => {
    setSocketValue((prev) => ({
      ...prev,
      socketId: socket.id
    }));
  });

  socket.on('ONLINE_USER_CHANGED', (onlineUsers) => {
    setSocketValue((prev) => ({
      ...prev,
      onlineUsers
    }));
  });

  // receive message
  socket.on('RECEIVE_MESSAGE', (messageData) => {
    console.log('****');
    console.log('收到訊息了');
    console.log('****');
    setSocketValue((prev) => ({
      ...prev,
      messageData
    }));
  });

  // message has been read
  socket.on('MESSAGE_READ', (messageReadStatus) => {
    console.log('=== socket 收到「對方」已讀通知 ===');
    setSocketValue((prev) => ({
      ...prev,
      messageReadStatus
    }));
  });

  // someone is typing
  socket.on('TYPING_NOTIFY', (typingNotify) => {
    setSocketValue((prev) => ({
      ...prev,
      typingNotify
    }));
  });

  // someone enter / leave chat room
  socket.on('CHAT_ROOM_NOTIFY', ({ message }) => {
    setSocketValue((prev) => ({
      ...prev,
      roomNotify: message
    }));
  });

  // someone invited user to room
  socket.on('INVITED_TO_ROOM', ({ message }) => {
    setSocketValue((prev) => ({
      ...prev,
      invitedNotify: message
    }));
  });
};
