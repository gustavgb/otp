import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { collectionData, docData } from 'rxfire/firestore'
import { map } from 'rxjs/operators'

import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'
import SHA3 from 'crypto-js/sha3'

export const hash = (message) => SHA3(message).toString()
export const encrypt = (message, pass) => aes.encrypt(message, pass).toString()
export const decrypt = (message, pass) => aes.decrypt(message, pass).toString(encUtf8)
const matchContent = /^(.*)\|([A-Z2-7]*)$/

window.hash = hash

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
    return Promise.reject(new Error('Not logged in'))
  }

  if (!name || !code || !pass) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid
  const content = name + '|' + code.toUpperCase().replace(/\s/g, '')
  const contentEncrypted = encrypt(content, pass)

  return firestore.collection(`users/${uid}/accounts`).add({
    content: contentEncrypted,
    createDate: firebase.firestore.FieldValue.serverTimestamp()
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

  const ref = firestore
    .collection(`users/${uid}/accounts`)
    .orderBy('createDate')

  return collectionData(ref, 'id')
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

export const streamUserKey = () => {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not logged in')
  }

  const uid = user.uid

  return docData(firestore.doc(`users/${uid}`), 'id')
    .pipe(
      map(user => user ? user.key : null)
    )
}

export const createUserKey = (pass) => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error('Not logged in'))
  }

  if (!pass) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid

  return firestore.doc(`users/${uid}`).set({
    key: encrypt(new Date().toString(), pass)
  })
}
