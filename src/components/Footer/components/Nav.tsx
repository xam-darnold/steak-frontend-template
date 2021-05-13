import React from 'react'
import styled from 'styled-components'
import discord from '../../../assets/background/discord_planet.png'
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
        <img src={discord} alt="" />
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://github.com/sushiswap">
        Github
      </StyledLink> */}
      <StyledLink target="_blank" href="https://twitter.com/stake_steak">
        <img src={twitter} alt="" />
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://medium.com/@sushiswapchef">
        Medium
      </StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
