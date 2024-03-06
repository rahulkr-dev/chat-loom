import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from './components/provider/theme-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="chat-loom-theme" >

    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
