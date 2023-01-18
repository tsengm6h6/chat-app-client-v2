import React from 'react'
import styled from 'styled-components'
import ListItem from './ChatListItem'
import { fakeRecord } from '../../data/fakeRecord'
import { useChatContext } from '../../context/ChatContext'


function ChatRecordList() {
  const { setChatId } = useChatContext()

  const renderedRecord = fakeRecord.map(record => {
    return (
      <ListItem 
        key={record.id}
        handleItemClick={() => setChatId(record.id)}
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