import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import './components/Navbar.css'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)


  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <StyledLogoWrapper>
              <Logo />
              </StyledLogoWrapper>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/farms" className="nav-links" onClick={closeMobileMenu}>
                SteakHouse
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/staking"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                xSTEAK
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/staking-fusd"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                iFUSD
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/docs"
                target="_blank"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Docs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/bug"
                target="_blank"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Bug Bounty
              </Link>
            </li>
          </ul>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </div>
      </nav>
    </>
    // <StyledTopBar>
    //   <Container size="lg">
    //     <StyledTopBarInner>
    //       <StyledLogoWrapper>
    //         <Logo />
    //       </StyledLogoWrapper>
    //       <Nav />
    //       <StyledAccountButtonWrapper>
    //         <AccountButton />
    //       </StyledAccountButtonWrapper>
    //     </StyledTopBarInner>
    //   </Container>
    // </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 100px;
`

// const StyledTopBar = styled.div``

// const StyledTopBarInner = styled.div`
//   align-items: center;
//   display: flex;
//   height: ${(props) => props.theme.topBarSize}px;
//   justify-content: space-between;
//   max-width: ${(props) => props.theme.siteWidth}px;
//   width: 100%;
// `
// // const StyledNavWrapper = styled.div`
// //   display: flex;
// //   flex: 1;
// //   justify-content: center;
// //   @media (max-width: 400px) {
// //     display: none;
// //   }
// // `

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  z-index: 999 @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

// const StyledMenuButton = styled.button`
//   background: none;
//   border: 0;
//   margin: 0;
//   outline: 0;
//   padding: 0;
//   display: none;
//   @media (max-width: 400px) {
//     align-items: center;
//     display: flex;
//     height: 44px;
//     justify-content: center;
//     width: 44px;
//   }
// `

export default TopBar
