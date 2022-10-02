import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import BufferPolyfill from 'buffer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// This is necessary for crypto-js to work with Webpack 5
/* eslint-disable-next-line */
// @ts-ignore
window.Buffer = BufferPolyfill.Buffer

const theme = createTheme({
  palette: {
    primary: {
      main: '#009300'
    },
    secondary: {
      main: '#930093'
    }
  }
})

const Main = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(<Main />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
