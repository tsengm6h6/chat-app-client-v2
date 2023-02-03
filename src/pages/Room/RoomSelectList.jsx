import React, { useState } from 'react'
import styled from 'styled-components'
import RoomSelectItem from './RoomSelectItem'
import { useChatContext } from '../../context/ChatContext'
import { PrimaryButton } from '../../components/Button'

function ChatContactList({ setShow }) {
  const { contactsWithOnlineStatus } = useChatContext()
  const options = contactsWithOnlineStatus.filter(contact => contact.chatType !== 'room')
  const [ selected, setSelected ] = useState([])

  const handleOptionClick = (optionId) => {
    if (selected.includes(optionId)) {
      return setSelected(prev => prev.filter(id => id !== optionId))
    }
    setSelected(prev => ([...prev, optionId]))
  }

  const onSubmitSelected = (e) => {
    e.preventDefault()
    console.log('selected', selected)
    setShow(prev => !prev)
  }

  const renderedOptions = options.map(option => {
    const { _id, avatarImage, ...other } = option
    return (
      <RoomSelectItem 
        key={_id}
        selected={selected.includes(_id)}
        avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
        handleItemClick={() => handleOptionClick(_id)}
        {...other} />
    )
  })

  return (
    <SelectContainer>
      <GroupTitle>Select your room members</GroupTitle>
      <List>
        <ListGroup>
        {renderedOptions}
        </ListGroup>
      </List>
      <ButtonWrapper onClick={(e) => onSubmitSelected(e)}>
        <PrimaryButton>Select</PrimaryButton>
      </ButtonWrapper>
    </SelectContainer>
  )
}

const SelectContainer = styled.div `
  width: 100%;
  max-width: 480px;
  margin-top: 40px;
`

const List = styled.div `
  height: 70vh;
  overflow: auto;
`

const ListGroup = styled.ul `
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GroupTitle = styled.h3 `
  padding-left: 1rem;
  font-size: 1.25rem;
  color: var(--main-color);
  align-self: flex-start;
  text-transform: capitalize;
`

const ButtonWrapper = styled.div `
  margin: 1rem;
  display: flex;
  justify-content: center;
`

export default ChatContactList