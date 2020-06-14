# otp

This app does the same as Twillio's Authy authenticator. But it works from a web app, which means that it can be used on *any* device, even my lovely linux machine 🤓

## Relies on

[otplib](https://www.npmjs.com/package/otplib)

[crypto-js](https://www.npmjs.com/package/crypto-js)

Firebase

React

## Features

1. Compatible with anything that works with Google Authenticator (specifically the [RFC 6238](https://tools.ietf.org/html/rfc6238))
2. E2EE encrypted backup using AES-256 and SHA-3
3. Syncing between all devices
4. Available on all devices through the browser
5. Open source

## How are the accounts secured?

The data itself is protected by Firebase Authentication, so only with a correct login, the data can be fetched.

Furthermore, because data is end-to-end encrypted, fetching the data doesn't enable you to read the data. First it must be decrypted using another password, that's then hashed using SHA-3.

When you enter your encryption passphrase into the app, you can choose to save the passphrase for that session. This doesn't save the password, but the hashed version that's used for encryption. So your password is never stored as free text. When the tab is closed, the session storage is cleared and next time, the password must be typed again.
