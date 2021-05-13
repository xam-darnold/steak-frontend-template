import React from 'react'
import styled from 'styled-components'
import footerImage from '../../../assets/background/footer.png'

const Image: React.FC = () => {
  return (
    <StyledImage>
        <img src={footerImage} alt='' />
    </StyledImage>
  )
}

const StyledImage = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  margin-top: 500px;
  justify-content: center;
  padding-top: 50px;
  z-index: -1;
`


export default Image