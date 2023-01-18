import React from 'react'
import styled from 'styled-components'
import ListItem from './ChatListItem'
import { fakeRecord } from '../../data/fakeRecord'


function ChatRecordList() {

  const renderedRecord = fakeRecord.map(record => {
    return (
      <ListItem key={record.id} {...record}  />
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