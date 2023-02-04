import styled from 'styled-components';
import { useChatContext } from '../../context/ChatContext';
import { IoArrowUndo } from 'react-icons/io5';
import Avatar, { MultiAvatar } from '../../components/Avatar';

function ChatRoomHeader() {
  const { chatInfo, setChatInfo, contacts } = useChatContext();

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

  return (
    chatInfo !== null && (
      <RoomHeader>
        <HeaderIcon onClick={() => setChatInfo(null)}>
          <IconWrapper>
            <IoArrowUndo />
          </IconWrapper>
        </HeaderIcon>
        <HeaderName>{chatInfo?.name}</HeaderName>
        <HeaderMembers>
          {roomUsersId.length > 0 && multipleAvatar}
          <Avatar
            size="small"
            src={chatInfo?.avatarImage ? `data:image/svg+xml;base64,${chatInfo.avatarImage}` : '/user.png'}
          />
        </HeaderMembers>
      </RoomHeader>
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
  justify-self: center;
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
