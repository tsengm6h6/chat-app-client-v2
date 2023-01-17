import React, { useContext } from 'react'
import styled from 'styled-components'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { ThemeContext } from 'styled-components'


function Navbar() {
  const { mode, setMode } = useContext(ThemeContext)
  

  return (
    <NavContainer>
      <NavLogo>
        <NavImage src="/talking.png" alt="brand=logo" />
        <NavBrand>ChatBot</NavBrand>
      </NavLogo>
      <NavModeToggler>
        { 
          mode === 'light'
          ? <HiOutlineSun onClick={() => setMode('dark')} />
          : <HiOutlineMoon onClick={() => setMode('light')} />
        }
      </NavModeToggler>
    </NavContainer>
  )
}

const NavContainer = styled.nav `
  height: 80px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--bg-color-darken);
`

const NavLogo = styled.div `
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavImage = styled.img `
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
`

const NavBrand = styled.h1 `
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
`

const NavModeToggler = styled.div `
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-color-main);
  cursor: pointer;
`

export default Navbar