import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  steak: {
    250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
  },
  steakHouse: {
    250: '0x59cC5f5F9309448Fe4a7Bd2dB8eB2DaC0F8fCEA7',
  },
  wftm: {
    250: '0xad84341756bf337f5a0164515b1f6f993d194e1f'
  },
  xSteak: {
    250: '0xb632c5d42BD4a44a617608Ad1c7d38f597E22E3C'
  },
  router: {
    250: '0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52'
  },
  ifusd: {
    250: '0x9fC071cE771c7B27b7d9A57C32c0a84c18200F8a'
  },
  fusd: {
    250: '0xad84341756bf337f5a0164515b1f6f993d194e1f'
  },
}


export const supportedPools = [
  // Perm Menu
  {
    pid: 0,
    lpAddresses: {
      250: '0x9fC071cE771c7B27b7d9A57C32c0a84c18200F8a'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Filet Mignon!',
    symbol: 'iFUSD',
    tokenSymbol: 'iFUSD',
    icon: '/images/ifusd.png',
  },
  {
    pid: 1,
    lpAddresses: {
      250: '0xcA78e7c058951D1e50eE74B8e9FBb4c9523E9e5A'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Ribeye!',
    symbol: 'STEAK-FUSD spLP',
    tokenSymbol: 'STEAK',
    icon: '/images/steak_orange.png',
  },
  {
    pid: 2,
    lpAddresses: {
      250: '0x679449a920087828776aeEF4074549410D5c8065'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'New York Strip!',
    symbol: 'USDC-FUSD spLP',
    tokenSymbol: 'USDC',
    icon: '/images/usdc.png',
  },
  {
    pid: 5,
    lpAddresses: {
      250: '0xBaf1B2fD16f7294ca158B3F1065e5f27F9c72b61'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Porterhouse!',
    symbol: 'FTM-FUSD spLP',
    tokenSymbol: 'FTM',
    icon: '/images/ftm.png',
  },
  {
    pid: 3,
    lpAddresses: {
      250: '0x98c8cc0E444CE7490926A6C58484B937CF60E117'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Sirloin!',
    symbol: 'DAI-FUSD spLP',
    tokenSymbol: 'DAI',
    icon: '/images/dai.png',
  },
  {
    pid: 4,
    lpAddresses: {
      250: '0x0Ec22C6018818ba765A6aB5E8B9C8db0457f967c'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'T-Bone!',
    symbol: 'FUSDT-FUSD spLP',
    tokenSymbol: 'FUSDT',
    icon: '/images/usdt.png',
  },
  {
    pid: 6,
    lpAddresses: {
      250: '0x74772FBe8ea1b9aD1D750D6334Cdb8C3e227D6ED'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Flank!',
    symbol: 'SPIRIT-FUSD spLP',
    tokenSymbol: 'SPIRIT',
    icon: '/images/spirit.png',
  },
  {
    pid: 7,
    lpAddresses: {
      250: '0xD5FD7B691FCe916E4Fa920f126c2B5Ddb620d019'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Denver Cut!',
    symbol: 'WBTC-FUSD spLP',
    tokenSymbol: 'WBTC',
    icon: '/images/wbtc.png',
  },
  {
    pid: 8,
    lpAddresses: {
      250: '0x91FA829538Ae3678b7EFDeffaf1198e03613d52A'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Skirt!',
    symbol: 'WETH-FUSD spLP',
    tokenSymbol: 'WETH',
    icon: '/images/weth.png',
  },
  {
    pid: 9,
    lpAddresses: {
      250: '0x0bb7Ed20B61b34aE53222f32e4094C1Bba502B16'
    },
    tokenAddresses: {
      250: '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
    },
    name: 'Tomahawk!',
    symbol: 'BNB-FUSD spLP',
    tokenSymbol: 'BNB',
    icon: '/images/bnb.png',
  },
]
