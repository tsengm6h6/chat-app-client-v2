import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button `
  width: 80%;
  min-width: 150px;
  padding: 1rem;
  font-size: 1rem;
  letter-spacing: 1px;
  margin: 0.5rem 0;
  border-radius: 4px;
  background-color: var(--bg-color-main);
  color: var(--secondary);
  border: 2px solid var(--secondary);
  cursor: pointer;
`

const StyledPrimaryButton = styled(StyledButton) `
  background-color: var(--secondary);
  color: var(--bg-color-main);
  border-color: transparent;
`

function Button({ children }) {
  return (
    <StyledButton>{children}</StyledButton>
  )
}

function PrimaryButton({ children }) {
  return (
    <StyledPrimaryButton>{children}</StyledPrimaryButton>
  )
}

export { Button, PrimaryButton }