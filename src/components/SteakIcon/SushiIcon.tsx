import React from 'react'
import steak from '../../assets/img/steak_icons/steak_logo_64.png'

interface SteakIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const SteakIcon: React.FC<SteakIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    <img src={steak} width={50} alt="steak_logo"/>
  </span>
)

export default SteakIcon
