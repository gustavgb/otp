import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { collectionData } from 'rxfire/firestore'
import { map } from 'rxjs/operators'

import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

const encrypt = (message, pass) => aes.encrypt(message, pass).toString()
const decrypt = (message, pass) => aes.decrypt(message, pass).toString(encUtf8)
const matchContent = /^(.*)\|([A-Z2-7]*)$/

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAJYuy1Qs3WZ_Ne0Y7VsnYFKxx9ut3O7_w',
  authDomain: 'otp-gbur.firebaseapp.com',
  databaseURL: 'https://otp-gbur.firebaseio.com',
  projectId: 'otp-gbur',
  storageBucket: 'otp-gbur.appspot.com',
  messagingSenderId: '884103461990',
  appId: '1:884103461990:web:908955f698082d615c41a7'
})

export const firestore = app.firestore()
export const auth = app.auth()

export const addAccount = (name, code, pass) => {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not logged in')
  }

  if (!name || !code || !pass) {
    throw new Error('Missing parameters')
  }

  const uid = user.uid
  const content = name + '|' + code.toUpperCase().replace(/\s/g, '')
  const contentEncrypted = encrypt(content, pass)

  return firestore.collection(`users/${uid}/accounts`).add({
    content: contentEncrypted
  })
}

export const streamAccounts = (pass) => {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not logged in')
  }

  if (!pass) {
    throw new Error('Missing parameters')
  }

  const uid = user.uid

  return collectionData(firestore.collection(`users/${uid}/accounts`), 'id')
    .pipe(
      map(accounts => accounts
        .map(account => {
          const decrypted = decrypt(account.content, pass)

          if (decrypted) {
            const [, name, code] = decrypted.match(matchContent)

            return {
              id: account.id,
              name,
              code
            }
          }
          return null
        })
        .filter(Boolean)
      )
    )
}
