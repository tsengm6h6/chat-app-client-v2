import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { timeFormatter } from '../../utils/timeFormatter';

function ChatListItem(props) {
  const { avatarImage, name, latestMessage, latestMessageUpdatedAt, unreadCount, isOnline, handleItemClick } = props;

  return (
    <ListItem onClick={handleItemClick}>
      <Avatar onlineStyle={isOnline ? 'dotted' : null} src={avatarImage} alt="avatar" />
      <ListContent>
        <TitleBox>
          <ContentTitle>{name}</ContentTitle>
          <ContentText>{latestMessage}</ContentText>
        </TitleBox>
        <TimeBox>
          <ContentTime>{timeFormatter(latestMessageUpdatedAt)}</ContentTime>
          {unreadCount !== 0 && <ContentUnread>{unreadCount}</ContentUnread>}
        </TimeBox>
      </ListContent>
    </ListItem>
  );
}

ChatListItem.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  latestMessage: PropTypes.string,
  latestMessageUpdatedAt: PropTypes.string,
  unreadCount: PropTypes.number,
  isOnline: PropTypes.bool,
  handleItemClick: PropTypes.func
};

ChatListItem.defaultProps = {
  unreadCount: 0,
  isOnline: false
};

const ListItem = styled.li`
  width: 100%;
  min-width: none;
  max-width: 480px;
  height: 100px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--bg-color-darken);
  border-radius: 8px;
  cursor: pointer;
`;

const ListContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--bg-color-darken);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled(Box)`
  flex: 1;
  overflow: hidden;
`;

const TimeBox = styled(Box)`
  align-items: flex-end;
  gap: 0.5rem;
`;

const ContentTitle = styled.h2`
  font-size: 1.25em;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--main-color);
`;

const ContentText = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #7e7e7e;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`;

const ContentTime = styled.p`
  font-size: 1em;
  font-weight: 500;
  color: var(--main-color);
  margin-bottom: 8px;
`;

const ContentUnread = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${(props) => (props.theme.mode === 'dark' ? 'var(--secondary)' : 'var(--warning)')};
  font-size: 0.5em;
  font-weight: 500;
  color: var(--bg-color-main);
`;

export default ChatListItem;
