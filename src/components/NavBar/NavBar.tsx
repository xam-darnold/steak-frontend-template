import React, { useState } from 'react'
import styled from 'styled-components'
// import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SidebarData from './components/sidebarData'
import AccountButton from './components/AccountButton'
import peggysummer from '../../assets/img/peggy_summer.png'
// import logo from '../../assets/img/logo.png'
import './components/Navbar.css'
import { IconContext } from 'react-icons'

const NavBar: React.FC = () => {
  const [sidebar, setSidebar] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          {/* <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        {/* <StyledLogoImage>
            <img src={logo} alt= 'logo'/>
        </StyledLogoImage> */}
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
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
          <StyledNavImage>
            <img src={peggysummer} alt='Peggy!'/>
          </StyledNavImage>
        </nav>
      </IconContext.Provider>
    </>
  )
}

// const StyledLogoImage = styled.div`
//   display: flex;
//   position: absolute;
//   align-items: center;
//   justify-content: flex-end;
//   width: 200px;
//   padding: 16px 16px 16px 16px;
// `

const StyledNavImage = styled.div`
  display: flex;
  position: absolute;
  align-items: flex-end;
  justify-content: flex-end;
  width: 250px;
  padding-top: 515px;


`

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
