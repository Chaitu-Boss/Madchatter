import React from 'react'
import AllRoutes from './AllRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AllRoutes /></>

  )
}

export default App
