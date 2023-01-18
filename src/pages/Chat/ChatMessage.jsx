import React from 'react'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'

function ChatMessage({ avatar, id, name, text, time, unread }) {
  const userId = [3, 5, 6, 8]
  const fromSelf = userId.includes(id)

  console.log(id, fromSelf)

  return (
    <Message className={fromSelf ? 'self' : null }>
      <Avatar size="medium" src={avatar} />
      <Text className={fromSelf ? 'self' : null }>{text}</Text>
    </Message>
  )
}

const Message = styled.div `
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 0.5rem 0;

  &.self {
    flex-direction: row-reverse;
    align-self: flex-end;
  }
`

const Text = styled.p `
  padding: 1rem 1rem;
  background-color: var(--bg-color-darken);
  border-radius: 20px;
  border-top-left-radius: 4px;
  max-width: 55%;

  &.self {
    border-top-right-radius: 4px;
    border-top-left-radius: 20px;
  }
`


export default ChatMessage