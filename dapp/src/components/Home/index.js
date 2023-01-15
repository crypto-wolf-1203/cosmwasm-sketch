import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCustomWallet } from '../../contexts/WalletContext'

import {
  HomeContainer,
  BackgroundImageContainer
} from './styles'

export const Home = (props) => {
  return (
    <HomeContainer>
      <Link to='/wallet'>Connect to Wallet</Link>
    </HomeContainer>
  )
}
