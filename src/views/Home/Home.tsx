import React from 'react'
// import styled from 'styled-components'
import header from '../../assets/background/header.png'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Harvest from './components/Harvest'
import AddToken from './components/AddToken'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={header} height={120} alt="farmer_logo" />}
        title="Earn yield on iFUSD and FUSD-PAIR LP"
        subtitle='"The key to success is to find a way to stand out - to be the purple cow in a field of monochrome Holsteins" -Seth Godin'
        heading="StakeSteak"
        variant="secondary"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
      <Harvest />
      <Spacer size="lg" />
      <AddToken />
      </div>
      <Spacer size="lg" />
    </Page>
  )
}

// const StyledInfo = styled.h3`
//   color: ${(props) => props.theme.color.grey[500]};
//   font-size: 16px;
//   font-weight: 400;
//   margin: 0;
//   padding: 0;
//   text-align: center;

//   > b {
//     color: ${(props) => props.theme.color.grey[600]};
//   }
// `

export default Home
