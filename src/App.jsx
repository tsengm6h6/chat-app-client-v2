import styled from "styled-components"


function App() {

  return (
    <> 
      <Block></Block>
    <Text>HELLO</Text>
    </>
  )
}


const Block = styled.div `
  width: 50px;
  height: 50px;  
  background-color: var(--warning);
`

const Text = styled.h1`
  font-size: 2rem;
`

export default App
