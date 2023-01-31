import React from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../context/ChatContext'
import { useSocketContext } from '../../context/SocketContext';
import { IoArrowUndo } from "react-icons/io5";
import Avatar from '../../components/Avatar';

function ChatRoomHeader() {
  const { chatInfo, setChatInfo } = useChatContext()
  const { socketValue: { onlineUsers } } = useSocketContext()

  // const chatOnline = chatInfo && onlineUsers?.some(({ userId }) => userId === chatInfo._id)

  return (
    chatInfo !== null &&
      <RoomHeader>
        <HeaderIcon onClick={() => setChatInfo(null)}>
          <IconWrapper>
            <IoArrowUndo />
          </IconWrapper>
        </HeaderIcon>
        <HeaderName>{chatInfo?.name}</HeaderName>
        <HeaderMembers>
            <Avatar 
              size="small" 
              src={chatInfo?.avatarImage ? `data:image/svg+xml;base64,${chatInfo.avatarImage}` : '/user.png'} />
        </HeaderMembers>
      </RoomHeader>
  )
}

const RoomHeader = styled.div `
  padding: 0 1rem;
  height: 60px;
  background-color: var(--bg-color-darken);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  gap: 0.5rem;
`

const HeaderIcon = styled.div `
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  justify-self: flex-start;
  font-size: 1.25rem;
  color: var(--primary);
  margin: 0;
  cursor: pointer;
`

const IconWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderName = styled.h2 `
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  font-size: 1.25rem;
  justify-self: center;
`
const HeaderMembers = styled.div `
  grid-column: 4 / 5;
  grid-row: 1 / 3;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ChatRoomHeader