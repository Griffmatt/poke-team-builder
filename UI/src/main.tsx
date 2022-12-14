import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeContextProvider } from './Context/themeContext'
import { UserContextProvider } from './Context/userContext'
import { LoginModalContextProvider } from './Context/loginModalContext'

export const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <UserContextProvider>
            <LoginModalContextProvider>
              <App/>
            </LoginModalContextProvider>
          </UserContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
