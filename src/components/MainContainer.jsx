import React from 'react'
import styled from 'styled-components'

function MainContainer({ children }) {
  return (
    <Container>
      { children }
    </Container>
  )
}


export const Container = styled.div `
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 2rem 0 3rem;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default MainContainer