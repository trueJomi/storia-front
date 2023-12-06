import React from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth.hook'

function App (): React.JSX.Element {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Router/>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
