import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { GlobalStyle } from './utils/style'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={{ mode: 'light' }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
)
