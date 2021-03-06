import React from 'react'
// import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as GiIcons from 'react-icons/gi'
import * as RiIcons from 'react-icons/ri'

const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'CrossSwap 🔁',
        path: '/crossswap',
        icon: <GiIcons.GiRoundTable />,
        cName: 'nav-text'
    },
    {
        title: 'SteakHouseV2',
        path: '/farms2',
        icon: <GiIcons.GiForkKnifeSpoon />,
        cName: 'nav-text'
    },
    {
        title: 'xSTEAK',
        path: '/staking',
        icon: <GiIcons.GiSteak />,
        cName: 'nav-text'
    },
    {
        title: 'iFUSD',
        path: '/staking-fusd',
        icon: <RiIcons.RiCoinsLine />,
        cName: 'nav-text'
    },
    {
        title: 'Docs',
        path: '/docs',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Bug Bounty',
        path: '/bug',
        icon: <AiIcons.AiFillBug />,
        cName: 'nav-text'
    },
    {
        title: 'SteakHouse 🚫',
        path: '/farms',
        icon: <GiIcons.GiKnifeFork />,
        cName: 'nav-text'
    },
]

export default SidebarData