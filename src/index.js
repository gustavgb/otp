import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import generateCode from './generateCode'
import aes from 'crypto-js/aes'
import { enc } from 'crypto-js'

window.encrypt = (message, pass) => aes.encrypt(message, pass).toString()
window.decrypt = (message, pass) => aes.decrypt(message, pass).toString(enc.Utf8)

window.generateCode = generateCode

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
