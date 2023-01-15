import React, { useState, useEffect } from 'react'

import { useCustomWallet } from '../../contexts/WalletContext'

import {
  WalletContainer
} from './styles'

export const Wallet = (props) => {
  const { connectKeplr, disconnectKeplr, keplrAddress, error, isLoggedIn } = useCustomWallet()

  return (
    <WalletContainer>
      <div>
        {
          error ?
            <a href='https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en' target='_blank' className='wallet-connect-button'>Install Keplr Wallet Extension</a>
            :
            <div className='wallet-connect-button' onClick={isLoggedIn() === true? disconnectKeplr: connectKeplr}>{isLoggedIn() === true? 'Disconnect': 'Connect to Keplr'}</div>
        }
        <div className='wallet-address-text'>{error || (keplrAddress ?? 'Not connected')}</div>
      </div>
    </WalletContainer>
  )
}
