import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import footerImage from '../../../assets/background/footer.png'
import discord from '../../../assets/background/discord_planet.png'
import steak from '../../../assets/background/steak_planet.png'
import ifusd from '../../../assets/background/ifusd_planet.png'
import github from '../../../assets/background/github_planet.png'
import medium from '../../../assets/background/medium_planet.png'
import twitter from '../../../assets/background/twitter_planet.png'

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Nav: React.FC = () => {
  return (
    <>
      <StyledNav>
        <StyledLink
          target="_blank"
          href="https://discord.gg/GHJdA56t"
          style={{ top: '300px', left: '650px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={discord}
            width={100}
            alt=""
          />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://twitter.com/stake_steak"
          style={{ top: '100px', right: '50px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={twitter}
            width={150}
            alt=""
          />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://stakesteak.com"
          style={{ top: '40px', right: '400px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={steak}
            width={200}
            alt=""
          />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://stakesteak.com/staking-fusd"
          style={{ top: '250px', left: '350px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={ifusd}
            width={200}
            alt=""
          />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://twitter.com/stake_steak"
          style={{ top: '50px', left: '200px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={github}
            width={150}
            alt=""
          />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://stakesteak.medium.com"
          style={{ top: '200px', right: '900px' }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={transition}
            src={medium}
            width={100}
            alt=""
          />
        </StyledLink>
      </StyledNav>
      <StyledImage>
        <img src={footerImage} alt="" />
      </StyledImage>
    </>
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
  position: relative;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  z-index: 1;
`

export default Nav
