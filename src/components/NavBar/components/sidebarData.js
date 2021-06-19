import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as GiIcons from 'react-icons/gi'
import * as RiIcons from 'react-icons/ri'

const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    {
        title: 'Steakhouse',
        path: '/farms',
        icon: <GiIcons.GiKnifeFork/>,
        cName: 'nav-text'
    },

    {
        title: 'xSTEAK',
        path: '/staking',
        icon: <GiIcons.GiSteak/>,
        cName: 'nav-text'
    },

    {
        title: 'iFUSD',
        path: '/staking-fusd',
        icon: <RiIcons.RiCoinsLine/>,
        cName: 'nav-text'
    },

    {
        title: 'Product Paper',
        path: '/StakeSteak_Product_Paper.pdf',
        icon: <FaIcons.FaNewspaper/>,
        cName: 'nav-text'
    },

    {
        title: 'Docs',
        path: '/docs',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    }
]

export default SidebarData