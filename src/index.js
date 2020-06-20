import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Helmet } from 'react-helmet'
import icon from './assets/icon.png'
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

const theme = createMuiTheme({
  mixins: {
    drawer: {
      width: 240
    }
  }
})

const Main = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={10}>
      <CssBaseline />
      <Helmet>
        <title>OTP</title>
        <link rel="icon" href={icon} />
      </Helmet>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
)

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
