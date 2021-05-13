import React from 'react'
import styled from 'styled-components'
import footerImage from '../../../assets/background/footer.png'
import discord from '../../../assets/background/discord_planet.png'
import steak from '../../../assets/background/steak_planet.png'
import ifusd from '../../../assets/background/ifusd_planet.png'
import github from '../../../assets/background/github_planet.png'
import medium from '../../../assets/background/medium_planet.png'
import twitter from '../../../assets/background/twitter_planet.png'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      {/* <StyledLink
        target="_blank"
        href="https://ftmscan.com/address/0x11BdbF56Ce48E7Ac91a3a894521d74Fec8214Dd6"
      >
        STEAK Contract
      </StyledLink> */}
      {/*<StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xce84867c3c02b05dc570d0135103d3fb9cc19433"
      >
        SushiSwap SUSHI-ETH
      </StyledLink> */}
      <StyledLink target="_blank" href="https://discord.gg/GHJdA56t">
        <img src={discord} width={50} alt="" />
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://github.com/sushiswap">
        Github
      </StyledLink> */}
      <StyledLink target="_blank" href="https://twitter.com/stake_steak">
        <img src={twitter} width={100} alt="" />
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://medium.com/@sushiswapchef">
        Medium
      </StyledLink> */}
      <StyledImage>
        <img src={footerImage} alt='' />
      </StyledImage>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`
const StyledImage = styled.div`
  position: absolute;
  align-items: center;
  width = 1vw;
  display: flex;
  margin: 0 auto;
  margin-top: 500px;
  justify-content: center;
  padding-top: 50px;
  z-index: -1;
`

const StyledLink = styled.a`
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
