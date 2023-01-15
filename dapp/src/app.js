import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ToastListener from './components/Toast'
import { Wallet } from './pages/Wallet'
import { Home } from './pages/Home'

export const App = () => {

  return (
    <>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wallet' element={<Wallet />} />
        </Routes>
      </>
      <ToastListener />
    </>
  )
}
