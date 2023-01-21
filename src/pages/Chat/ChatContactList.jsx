import React from 'react'
import styled from 'styled-components'
import ListItem from './ChatListItem'
import { fakeRecord } from '../../data/fakeRecord'
import { useChatContext } from '../../context/ChatContext'


function ChatContactList() {
  const { contacts, handleChatSelect } = useChatContext()
  console.log(contacts)
  const renderedContacts = contacts.map(({ _id, avatarImage, ...record }) => {
    return (
      <ListItem 
        key={_id}
        avatarImage={avatarImage ? `data:image/svg+xml;base64,${avatarImage}` : '/user.png'}
        handleItemClick={(e) => handleChatSelect({ id: _id, chatType: record.chatType })}
        {...record} />
    )
  })

  return (
    <List>
      {renderedContacts}
    </List>
  )
}

const List = styled.ul `
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default ChatContactList