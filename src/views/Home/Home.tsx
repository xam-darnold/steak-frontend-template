import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Harvest from './components/Harvest'
import AddToken from './components/AddToken'
import ufo from '../../assets/background/ufo_new.png'
import tokens from '../../assets/background/tokens.png'


const Home: React.FC = () => {
  return (
    <Page>
      <Spacer size="lg" />
      <StyledTitle>StakeSteak</StyledTitle>
      <Spacer size="lg" />
      <StyledImage>
      <img src={ufo} height={200} width={200} alt="farmer_logo" />
      </StyledImage>
      <StyledSubtitle>Our Mission: Build lasting infrastructure to stabilize fUSD at $1.00</StyledSubtitle>
      <Spacer size="lg" />
      <Container>
        <Balances />
      </Container>{' '}
      <Spacer size="md" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Harvest />
        <Spacer size="md" />
        <AddToken />
      </div>
      <PageHeader
        icon={<img src={tokens} height={500} width={500} alt="farmer_logo" />}
        title="Earn yield on iFUSD and FUSD-PAIR LP"
        subtitle='"The key to success is to find a way to stand out - to be the purple cow in a field of monochrome Holsteins" -Seth Godin'
        variant='secondary'
      />
        <StyledDisclaimer>
          Planets are LINKS!
        </StyledDisclaimer>
        <Spacer size="md" />
    </Page>
  )
}

const StyledTitle = styled.h1`
  position: absolute;
  text-align: center;
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

const StyledImage = styled.div`
  position: relative;
  text-align: center;
  margin-top: 10px;
`

const StyledSubtitle = styled.h2`
text-align: center;
font-family: 'Orbitron', sans-serif;
color: ${(props) => props.theme.color.grey[500]};
margin: 10px;
font-weight: 400;
font-size: 20px;
`

const StyledDisclaimer = styled.h1`
color: ${(props) => props.theme.color.grey[500]};
font-family: 'Krona One', monospace;
font-size: 30px;
font-weight: 500px;
margin-bottom: 20px;
padding: 20px;
text-align: center;
`
// const StyledInfo = styled.h3`
  // color: ${(props) => props.theme.color.grey[500]};
  // font-size: 16px;
  // font-weight: 400;
  // margin: 0;
  // padding: 0;
  // text-align: center;

  // > b {
  //   color: ${(props) => props.theme.color.grey[600]};
  // }
// `

export default Home
