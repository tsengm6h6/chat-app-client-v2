import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { GlobalStyle } from './utils/style'
import { ThemeProvider } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={{ mode: 'light' }}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
)
