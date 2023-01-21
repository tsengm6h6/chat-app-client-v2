import React, { useContext } from 'react'
import styled from 'styled-components'
import { HiOutlineSun, HiOutlineMoon, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import { ThemeContext } from 'styled-components'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'
import { useNavigate } from 'react-router-dom'


function Navbar() {
  const { mode, setMode } = useContext(ThemeContext)
  const { user, setUser } = useAuthContext() 
  const { setChatId } = useChatContext() 
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    setChatId(null)
    // TODO: 登出先一律清空
  }

  return (
    <NavContainer>
      <NavLogo onClick={() => navigate('/')}>
        <NavImage src="/talking.png" alt="brand=logo" />
        <NavBrand>ChatBot</NavBrand>
      </NavLogo>
      { user ? <NavUser>Welcome! <span>{user.name}</span></NavUser> : null }
      <NavIcons>
        <NavIcon>
          { 
            mode === 'light'
            ? <HiOutlineSun onClick={() => setMode('dark')} />
            : <HiOutlineMoon onClick={() => setMode('light')} />
          }
        </NavIcon>
        <NavIcon>
          <HiOutlineArrowTopRightOnSquare onClick={handleLogout} />
        </NavIcon>
      </NavIcons>
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
  cursor: pointer;
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

const NavUser = styled.h2 `
  flex: 1;
  font-size: 1rem;
  text-align: end;
  margin-right: 0.5rem;
  padding: 0 1rem;
  text-transform: capitalize;
  
  span {
    font-style: italic;
  }
`

const NavIcons = styled.div `
  display: flex;
  align-items: center;
`

const NavIcon = styled.div `
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-color-main);
  cursor: pointer;
  
  :not(:last-child) {
    margin-right: 0.5rem;
  }
`

export default Navbar