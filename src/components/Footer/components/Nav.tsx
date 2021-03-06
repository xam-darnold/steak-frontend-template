import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import footerImage from '../../../assets/background/footer_new.png'
import discord from '../../../assets/background/discord_label.png'
import steak from '../../../assets/background/steak_label.png'
import ifusd from '../../../assets/background/ifusd_label.png'
import github from '../../../assets/background/github_label.png'
import medium from '../../../assets/background/medium_label.png'
import twitter from '../../../assets/background/twitter_label.png'

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Nav: React.FC = () => {
  return (
    <>
      <StyledNav>
        <StyledLink
          target="_blank"
          href="https://discord.gg/aDmKM7E7SY"
          style={{ top: '400px', left: '650px' }}
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
          style={{ top: '200px', right: '50px' }}
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
          style={{ top: '140px', right: '400px' }}
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
          style={{ top: '375px', left: '350px' }}
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
          href="https://github.com/xam-darnold/steak-public-contracts"
          style={{ top: '150px', left: '200px' }}
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
          style={{ top: '325px', right: '900px' }}
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
  margin-top: 700px;
  justify-content: center;
  padding-top: 50px;
  z-index: -1;
`

const StyledLink = styled.a`
  position: relative;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
