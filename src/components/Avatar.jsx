import React from 'react'
import styled, { css } from 'styled-components'

function Avatar(props) {
  const { onlineStyle, size, ...otherProps } = props

  return (
    <StyledAvatar onlineStyle={onlineStyle} size={size}>
      <AvatarImage {...otherProps} />
    </StyledAvatar>
  )
}

export function MultiAvatar(props) {
  const { size, ...otherProps } = props

  return (
    <StyledMultiAvatar size={size}>
      <AvatarImage {...otherProps} />
    </StyledMultiAvatar>
  )
}

const StyledAvatar = styled.div `
  position: relative;

  &::after {
    content: "";
    width: 0.9rem;
    height: 0.9rem;
    background-color: ${props => props.onlineStyle === 'dotted' ? 'var(--warning)' : 'transparent' };
    filter: contrast(150%) brightness(105%);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

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
const AvatarImage = styled.img `
  object-fit: cover;
  object-position: center;
  filter: saturate(75%);
  border-radius: 50%;
`

const StyledMultiAvatar = styled(StyledAvatar) `
  transform: scale(1);

  &:not(:first-child) {
    margin-left: -8px;
  }
`

export default Avatar