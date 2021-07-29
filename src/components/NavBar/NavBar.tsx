import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SidebarData from './components/sidebarData'
import AccountButton from './components/AccountButton'
// import peggyplayer from '../../assets/img/Peggy_Player.png'
import './components/Navbar.css'
import { IconContext } from 'react-icons'
import useWindowWidth from '../../hooks/useWindowWidth'
import {
  getFUSDPrice,
  getSteakPrice,
} from '../../sushi/utils'
import useSushi from '../../hooks/useSushi'
import fusdImg from '../../assets/img/fusd_icons/fusd.png'
import steakImg from '../../assets/img/steak_icons/steak_orange.png'

const NavBar: React.FC = () => {
  const windowWidth = useWindowWidth()
  const sushi = useSushi()

  const [sidebar, setSidebar] = useState(false)
  const [fusdPrice, setFusdPrice] = useState<BigNumber>()
  const [steakPrice, setSteakPrice] = useState<BigNumber>()

  const toggleSidebar = () => setSidebar(!sidebar)

  const shouldSidebarBeOpen = () => windowWidth > 1200

  const handleLinkClick = () => {
    if (!shouldSidebarBeOpen()) {
      setSidebar(false)
    }
    setTokenPrices()
  }

  const setTokenPrices = async () => {
    if (sushi) {
      const prices = await Promise.all([getFUSDPrice(sushi), getSteakPrice(sushi)])
      setFusdPrice(new BigNumber(prices[0]))
      setSteakPrice(new BigNumber(prices[1]))
    }
  }

  useEffect(() => {
    if (shouldSidebarBeOpen()) {
      setSidebar(true)
    }
  }, [])

  useEffect(() => {
    if (!fusdPrice || !steakPrice)
      setTokenPrices()
  }, [sushi])

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={toggleSidebar} />
          </Link>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={toggleSidebar}>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={handleLinkClick}>
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
          <ul className="nav-token-prices">
            <li className="nav-price-text"><img src={steakImg} height={27} width={27} alt="Steak logo" /><span>${steakPrice?.toNumber()}</span></li>
            <li className="nav-price-text"><img src={fusdImg} height={27} width={27} alt="fUSD logo" /><span>${fusdPrice?.toNumber()}</span></li>
          </ul>
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
