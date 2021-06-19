import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
// import DisclaimerModal from './components/DisclaimerModal'
// import MobileMenu from './components/MobileMenu'
import NavBar from './components/NavBar/NavBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import SushiProvider from './contexts/SushiProvider'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Staking from './views/Staking'
import StakingFUSD from './views/StakingFUSD'

const App: React.FC = () => {
  // const [mobileMenu, setMobileMenu] = useState(false)

  // const handleDismissMobileMenu = useCallback(() => {
  //   setMobileMenu(false)
  // }, [setMobileMenu])

  // const handlePresentMobileMenu = useCallback(() => {
  //   setMobileMenu(true)
  // }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <NavBar />
        {/* <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} /> */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/staking">
            <Staking />
          </Route>
          <Route path="/staking-fusd">
            <StakingFUSD />
          </Route>
          <Route
            path="/docs"
            component={(): any => {
              window.location.href = 'https://app.gitbook.com/@stakesteak-1/s/stak/'
              return null
            }}
          />
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={250}
        connectors={{
          walletconnect: { rpcUrl: 'https://rpc.fantom.network' },
        }}
      >
        <SushiProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </SushiProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

// const Disclaimer: React.FC = () => {
//   const markSeen = useCallback(() => {
//     localStorage.setItem('disclaimer', 'seen')
//   }, [])

//   const [onPresentDisclaimerModal] = useModal(
//     <DisclaimerModal onConfirm={markSeen} />,
//   )

//   useEffect(() => {
//     const seenDisclaimer = false //localStorage.getItem('disclaimer')
//     if (!seenDisclaimer) {
//       onPresentDisclaimerModal()
//     }
//   }, [])

//   return <div />
// }

export default App
