import React from 'react'
import styled from 'styled-components'
import ListItem from './ChatListItem'
import { useChatContext } from '../../context/ChatContext'


function ChatContactList() {
  const { contacts, handleChatSelect } = useChatContext()
  const renderedContacts = contacts.map(contact => {
    const { _id, avatarImage, ...otherContact } = contact
    return (
      <ListItem 
        key={_id}
        avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
        handleItemClick={(e) => handleChatSelect(contact)}
        {...otherContact} />
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