import React from 'react'
import styled from 'styled-components'

function Form({ children, onSubmit }) {
  return (
    <FormWidget onSubmit={onSubmit}>
      {children}
    </FormWidget>
  )
}

const FormWidget = styled.form `
  width: 80%;
  min-width: 350px;
  max-width: 500px;
  background-color: var(--bg-color-main);
  padding: 3.5rem 1rem;
  border-radius: 4px;
  box-shadow: ${ props => props.theme.mode === 'light' 
      ? '3px 3px 10px #e2e2e2' 
      : '3px 3px 10px #131313' 
    };
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`

export default Form