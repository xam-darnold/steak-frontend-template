import React from 'react'
import Button from '../../../components/Button'
import { useWallet } from 'use-wallet'

const AddToken: React.FC = () => {
  const tokenAddress = '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
  const tokenSymbol = 'STEAK'
  const tokenDecimals = 18
  const tokenImage = 'https://stakesteak.com/images/steak_orange.png'
  const { ethereum }: { ethereum: any } = useWallet()

  const handleAddToken = async () => {
    if (ethereum) {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum._rpcRequest({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                  address: tokenAddress, // The address that the token is at.
                  symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                  decimals: tokenDecimals, // The number of decimals in the token
                  image: tokenImage, // A string url of the token logo
                },
              },
            });
    
            if (wasAdded) {
              console.log('Thanks for your interest!');
            } else {
              console.log('Your loss!');
            }
          } catch (error) {
            console.log(error);
          }
      }
    }

  return (

    <Button
      text={'Add STEAK to MetaMask'}
      onClick={async () => {
        await handleAddToken()
      }}
    />
  )
}

export default AddToken
