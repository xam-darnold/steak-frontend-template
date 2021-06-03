import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import cow from '../../assets/img/cow_icons/steak_logo_purple.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={cow} alt="cow_image" />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

// const StyledText = styled.span`
//   color: ${(props) => props.theme.color.grey[500]};
//   font-family: 'Krona One', sans-serif;
//   font-size: 18px;
//   font-weight: 600;
//   letter-spacing: 0.03em;
//   margin-left: ${(props) => props.theme.spacing[2]}px;
//   @media (max-width: 400px) {
//     display: none;
//   }
// `

// const MasterChefText = styled.span`
//   font-family: 'Orbitron', sans-serif;
//   font-size: 20px;
//   font-weight: 800;
// `

export default Logo
