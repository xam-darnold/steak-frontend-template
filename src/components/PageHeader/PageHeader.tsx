import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
  heading?: string
  variant?: string
}

let subtitleColor: string
let titleColor: string

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  subtitle,
  title,
  heading,
  variant,
}) => {
  const { color } = useContext(ThemeContext)
  switch (variant) {
    case 'secondary':
      subtitleColor = color.grey[400]
      titleColor = color.grey[900]
      break
    default:
      subtitleColor = color.grey[800]
      titleColor = color.grey[500]
  }

  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledImage>
          <StyledIcon>{icon}</StyledIcon>
          <StyledTitle1>{heading}</StyledTitle1>
        </StyledImage>
        <StyledTitle style={{ color: titleColor }}>{title}</StyledTitle>
        <StyledSubtitle style={{ color: subtitleColor }}>
          {subtitle}
        </StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
  justify-content: center;
`

const StyledIcon = styled.div`
  font-size: 120px;
  display: flex;
  line-height: 120px;
  text-align: center;
  width: 1000px;
  justify-content: center;
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`
const StyledImage = styled.div`
  position: relative;
  text-align: center;
`

const StyledTitle1 = styled.h1`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Orbitron', sans-serif;
  color: ${(props) => props.theme.color.grey[800]};
  font-weight: 900;
  font-size: 80px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

const StyledTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  font-family: 'Krona One', sans-serif;
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
