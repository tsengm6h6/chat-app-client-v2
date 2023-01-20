import React from 'react'
import styled, { css } from 'styled-components'

function Avatar({ src, ...props}) {
  return (
    <StyledAvatar src={ src ? `data:image/svg+xml;base64,${src}` : '/user.png' } {...props} alt="avatar" />
  )
}

export function MultiAvatar(props) {
  return (
    <StyledMultiAvatar {...props} alt="avatar" />
  )
}

const StyledAvatar = styled.img `
  background-color: var(--warning);
  border-radius: 50%;
  object-fit: cover;
  filter: saturate(75%);

  ${(props) => {
      switch (props.size) {
        case 'small':
          return css `
            min-width: 35px;
            min-height: 35px;
            width: 35px;
            height: 35px;
          `
          break;
        case 'medium':
          return css `
            min-width: 50px;
            min-height: 50px;
            width: 50px;
            height: 50px;
          `
          break;
        default:
          return css `
            min-width: 60px;
            min-height: 60px;
            width: 60px;
            height: 60px;
          `
          break;
      }
    }
  }
`

const StyledMultiAvatar = styled(StyledAvatar) `
  transform: scale(1);

  &:not(:first-child) {
    margin-left: -8px;
  }
`

export default Avatar