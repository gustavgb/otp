# otp

This app does the same as Twillio's Authy authenticator. But it works from a web app, which means that it can be used on *any* device, even my lovely linux machine 🤓

## Relies on

[otplib](https://www.npmjs.com/package/otplib)

[crypto-js](https://www.npmjs.com/package/crypto-js)

Firebase

React

## Features

1. Compatible with anything that works with Google Authenticator (specifically the [RFC 6238](https://tools.ietf.org/html/rfc6238))
2. E2EE encrypted backup using AES-256
3. Syncing between all devices
4. Available on all devices through the browser
5. Open source

## How are the accounts secured?

The data itself is protected by Firebase Authentication, so only with a correct login, the data can be fetched.

Furthermore, because data is end-to-end encrypted, fetching the data doesn't enable you to read the data. First it must be decrypted using another password.

Keep in mind that this app is no more secure than the device you are using it on. If your browser is compromised when you log in, there's a good chance that another person get's your password.
