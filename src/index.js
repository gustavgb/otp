import React from 'react'
import ReactDOM from 'react-dom'
import './assets/global.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Helmet } from 'react-helmet'
import icon from './assets/icon.png'

const Main = () => (
  <>
    <Helmet>
      <title>OTP</title>
      <link rel="icon" href={icon} />
    </Helmet>
    <App />
  </>
)

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
