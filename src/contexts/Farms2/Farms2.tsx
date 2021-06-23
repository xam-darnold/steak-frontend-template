import React, { useState } from 'react'

import useSushi from '../../hooks/useSushi'

import { getFarms2 } from '../../sushi/utils'

import Context2 from './context2'

const Farms2: React.FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()

  const farms = getFarms2(sushi)

  return (
    <Context2.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context2.Provider>
  )
}

export default Farms2
