import React from 'react'
import styled from 'styled-components'
import ListItem from './ChatListItem'
import { fakeRecord } from '../../data/fakeRecord'
import { useChatContext } from '../../context/ChatContext'


function ChatRecordList({ records }) {
  const { handleChatSelect } = useChatContext()
  console.log(records)
  const renderedRecord = records.map(({ _id, avatarImage, ...record }) => {
    return (
      <ListItem 
        key={_id}
        avatarImage={avatarImage ? `data:image/svg+xml;base64,${avatarImage}` : '/user.png'}
        handleItemClick={(e) => handleChatSelect(_id)}
        {...record} />
    )
  })

  return (
    <List>
      {renderedRecord}
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

export default ChatRecordList