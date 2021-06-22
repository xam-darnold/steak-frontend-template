import React, { useState } from 'react'

import useSushi from '../../hooks/useSushi'

import { getFarms2 } from '../../sushi/utils'

import Context2 from './context2'

const Farms2: React.FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()
  console.log(sushi)
  const farms = getFarms2(sushi)
  console.log(farms)

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
