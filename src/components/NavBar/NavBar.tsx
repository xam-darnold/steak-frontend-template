import React, { useState } from 'react'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SidebarData from './components/sidebarData'
import AccountButton from './components/AccountButton'
// import peggyplayer from '../../assets/img/Peggy_Player.png'
import './components/Navbar.css'
import { IconContext } from 'react-icons'

const NavBar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {/* <StyledNavImage>
            <img src={peggyplayer} alt='Peggy!'/>
          </StyledNavImage> */}
        </nav>
      </IconContext.Provider>
    </>
  )
}

// const StyledNavImage = styled.div`
//   display: flex;
//   position: absolute;
//   align-items: flex-end;
//   justify-content: flex-end;
//   width: 250px;
//   padding-top: 400px;


// `

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 2000px;
  margin-right: 20px;
  z-index: 999 @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

export default NavBar
