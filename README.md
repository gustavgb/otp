# otp

This app does the same as Twillio's Authy authenticator. But it works from a web app, which means that it can be used on *any* device, even my lovely linux machine 🤓

## Relies on

[otplib](https://www.npmjs.com/package/otplib)

[crypto-js](https://www.npmjs.com/package/crypto-js)

Firebase

React

## The idea

Like Authy, I think it's great to sync otp codes to the cloud to use them on all of your devices. Therefore the app would work like this:

1. Activate 2FA on your service and receive a 16-digit base32 key used to generate the OTP.
2. Add and account (the key and a label)
3. When saving this happens:
   1. Request a password from the user (preferably not the password they use to log in to the app)
   2. Use crypto-js to encrypt the key and the label
   3. Sync the key and the label to Firestore
   4. Store the password in memory to use within the session
4. After saving the account is available from the list of accounts
5. When opening an account, request the encryption password and use crypto-js to decrypt the account
6. When refreshing the page, the passphrase is gone and the user must type it again to decrypt their accounts

## Features

1. Compatible with anything that works with Google Authenticator (specifically the [RFC 6238](https://tools.ietf.org/html/rfc6238))
2. E2EE encrypted backup using AES-256
3. Syncing between all devices
4. Available on all devices through the browser
5. Open source

