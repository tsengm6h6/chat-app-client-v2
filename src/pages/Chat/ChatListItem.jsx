import React from 'react'
import styled from 'styled-components'

function ChatListItem({ avatar, name, text, time, unread }) {
  return (
    <ListItem>
        <Avatar src={ avatar } alt="avatar" />
        <ListContent>
          <TitleBox>
            <ContentTitle>{ name }</ContentTitle>
            <ContentText>{ text }</ContentText>
          </TitleBox>
          <TimeBox>
            <ContentTime>{ time }</ContentTime>
            { unread !== 0 && <ContentUnread>{ unread }</ContentUnread>}
          </TimeBox>
        </ListContent>
      </ListItem>
  )
}

const ListItem = styled.li `
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
`

const Avatar = styled.img `
  width: 60px;
  height: 60px;
  background-color: var(--warning);
  border-radius: 50%;
  object-fit: cover;
`

const ListContent = styled.div `
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--bg-color-darken);
`

const Box = styled.div `
  display: flex;
  flex-direction: column;
`

const TitleBox = styled(Box) `
  flex: 1;
  overflow: hidden;
`

const TimeBox = styled(Box) `
  align-items: flex-end;
  gap: 0.5rem;
`

const ContentTitle = styled.h2 `
  font-size: 1.25em;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--main-color);
`

const ContentText = styled.p `
  font-size: 1em;
  font-weight: 400;
  color: #7e7e7e;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`

const ContentTime = styled.p `
  font-size: 1em;
  font-weight: 500;
  color: var(--main-color);
  margin-bottom: 8px;
`

const ContentUnread = styled.span `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${props => props.theme.mode === 'dark' ? 'var(--secondary)' : 'var(--warning)'};
  font-size: 0.5em;
  font-weight: 600;
  color: var(--bg-color-main);
`

export default ChatListItem