import { useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../../context/ChatContext';
import { IoArrowUndo } from 'react-icons/io5';
import Avatar, { MultiAvatar } from '../../components/Avatar';

function ChatRoomHeader() {
  const { chatInfo, setChatInfo, contacts } = useChatContext();
  const [showMembers, setShowMembers] = useState(false);

  const isRoom = chatInfo?.chatType === 'room';
  const roomUsersId = chatInfo?.users || [];
  const multipleAvatar = roomUsersId.map((userId) => {
    const user = contacts?.find((contact) => contact._id === userId);
    return user ? (
      <MultiAvatar
        key={user._id}
        size="small"
        src={user?.avatarImage ? `data:image/svg+xml;base64,${user.avatarImage}` : '/user.png'}
      />
    ) : null;
  });

  const toggleShowMember = () => {
    if (!isRoom) return;
    setShowMembers((prev) => !prev);
  };

  return (
    chatInfo !== null && (
      <>
        <RoomHeader>
          <HeaderIcon onClick={() => setChatInfo(null)}>
            <IconWrapper>
              <IoArrowUndo />
            </IconWrapper>
          </HeaderIcon>
          {showMembers ? (
            <MembersBox onClick={toggleShowMember}>{multipleAvatar}</MembersBox>
          ) : (
            <HeaderName isRoom={isRoom} onClick={toggleShowMember}>
              {chatInfo?.name}
            </HeaderName>
          )}
          <HeaderMembers>
            <Avatar
              size="small"
              src={chatInfo?.avatarImage ? `data:image/svg+xml;base64,${chatInfo.avatarImage}` : '/user.png'}
            />
          </HeaderMembers>
        </RoomHeader>
      </>
    )
  );
}

const RoomHeader = styled.div`
  padding: 0 1rem;
  height: 60px;
  background-color: var(--bg-color-darken);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const MembersBox = styled.div`
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderIcon = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  justify-self: flex-start;
  font-size: 1.25rem;
  color: var(--primary);
  margin: 0;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderName = styled.h2`
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  font-size: 1.25rem;
  font-weight: 500;
  justify-self: center;
  cursor: ${(props) => (props.isRoom ? 'pointer' : 'default')};
`;

const HeaderMembers = styled.div`
  grid-column: 4 / 5;
  grid-row: 1 / 3;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ChatRoomHeader;
