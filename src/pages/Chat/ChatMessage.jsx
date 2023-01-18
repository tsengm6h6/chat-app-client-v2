import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'

const ChatMessage = forwardRef(
  function ChatMessage({ avatar, id, name, text, time, unread }, ref) {
    const messageRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        scrollIntoView() {
          messageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }
    }, [])

    const userId = [3, 5, 6]
    const fromSelf = userId.includes(id)
  
    return (
      <Message className={fromSelf ? 'self' : null } ref={messageRef}>
        <Avatar size="medium" src={avatar} />
        <Text className={fromSelf ? 'self' : null }>{text}</Text>
        <MessageDetail>
          <Status>read</Status>
          <Time>{time}</Time>
        </MessageDetail>
      </Message>
    )
  }
)

const Message = styled.div `
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1.5rem 0;

  &.self {
    flex-direction: row-reverse;
    align-self: flex-end;
  }
`

const Text = styled.p `
  padding: 1rem 1rem;
  margin-left: 0.5rem;
  background-color: var(--bg-color-darken);
  border-radius: 20px;
  border-top-left-radius: 4px;
  max-width: 55%;

  &.self {
    border-top-right-radius: 4px;
    border-top-left-radius: 20px;
    background-color: var(--secondary);
    color: ${props => props.theme.mode === 'light' ? 'var(--bg-color-main)' : 'var(--main-color)'};
  }
`

const MessageDetail = styled.div `
  align-self: flex-end;
  color: var(--main-color);
`

const Status = styled.span `
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 400;
`

const Time = styled.p `
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 4px;
`

export default ChatMessage