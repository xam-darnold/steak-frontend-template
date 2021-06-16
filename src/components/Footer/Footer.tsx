// import React from 'react';
// import { FooterContainer } from './containers/footer'

// function App() {
//   return(
//     <>
//       <FooterContainer/>
//     </>
//   )
// }

// export default App;


import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'

const Footer: React.FC = () => {
  const [nav, setNav] = useState<Boolean>(false);
  const showNav = () => {
    if (window.innerWidth <= 960) {
      setNav(false);
    } else {
      setNav(true);
    }
  };

  useEffect(() => {
    showNav();
  }, []);

  window.addEventListener("resize", showNav);
  return (
  <StyledFooter>
    <StyledFooterInner>
    {nav && <Nav />}
    </StyledFooterInner>
  </StyledFooter>
)}

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.theme.topBarSize}px;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`

export default Footer