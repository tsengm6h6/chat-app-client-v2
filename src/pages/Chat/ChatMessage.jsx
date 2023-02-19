import PropTypes from 'prop-types';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { timeFormatter } from '../../utils/timeFormatter';

const ChatMessage = forwardRef(function ChatMessage({ sender, avatarImage, _id, message, updatedAt, readers }, ref) {
  const { user } = useAuthContext();
  const { chatInfo } = useChatContext();
  const messageRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollIntoView() {
          messageRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      };
    },
    []
  );

  const fromSelf = user._id === sender;
  const isRoom = chatInfo.chatType === 'room';

  return (
    <Message className={fromSelf ? 'self' : null} ref={messageRef}>
      <Avatar size="medium" src={`data:image/svg+xml;base64,${avatarImage}`} />
      <Text className={fromSelf ? 'self' : null}>{message}</Text>
      <MessageDetail>
        {readers.length > 0 && fromSelf && <Status>Read {isRoom && readers.length}</Status>}
        <Time>{timeFormatter(updatedAt)}</Time>
      </MessageDetail>
    </Message>
  );
});

ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  readers: PropTypes.array.isRequired
};

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1.5rem 0;

  &.self {
    flex-direction: row-reverse;
    align-self: flex-end;
  }
`;

const Text = styled.p`
  padding: 1rem 1rem;
  margin-left: 0.5rem;
  background-color: var(--bg-color-darken);
  border-radius: 20px;
  border-top-left-radius: 4px;
  max-width: 55%;
  font-weight: 400;

  &.self {
    border-top-right-radius: 4px;
    border-top-left-radius: 20px;
    background-color: var(--secondary);
    color: ${(props) => (props.theme.mode === 'light' ? 'var(--bg-color-main)' : 'var(--main-color)')};
  }
`;

const MessageDetail = styled.div`
  align-self: flex-end;
  color: var(--main-color);
`;

const Status = styled.span`
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 400;
`;

const Time = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

export default ChatMessage;
