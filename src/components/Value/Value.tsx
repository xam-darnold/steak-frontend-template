import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
  value: string | number
  decimals?: number
  prefix?: string
}

const Value: React.FC<ValueProps> = ({ value, decimals, prefix }) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  useEffect(() => {
    if (typeof value === 'number') {
      updateStart(end)
      updateEnd(value)
    }
    //! added end dependency
  }, [value, end])

  return (
    <StyledValue>
      {typeof value == 'string' ? (
        value
      ) : (
        <CountUp
          start={start}
          end={end}
          decimals={
            decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e1 ? 2 : 8
          }
          duration={1}
          separator=","
          prefix={prefix}
        />
      )}
    </StyledValue>
  )
}

const StyledValue = styled.div`
  font-family: 'Orbitron', monospace;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
`

export default Value
