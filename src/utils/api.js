import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { collectionData, docData } from 'rxfire/firestore'
import { map } from 'rxjs/operators'

import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'
import SHA3 from 'crypto-js/sha3'
import shortid from 'shortid'

export const hash = (message) => SHA3(message).toString()
export const encrypt = (message, pass) => aes.encrypt(message, pass).toString()
export const decrypt = (message, pass) => aes.decrypt(message, pass).toString(encUtf8)

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

  return firestore.runTransaction(transaction => {
    return transaction.get(firestore.doc(`users/${uid}`)).then(doc => {
      if (!doc.exists) {
        throw new Error('User key does not exist')
      }

      const userKey = doc.data().key

      if (decrypt(userKey, pass)) {
        const id = shortid.generate()

        const mappedCode = code.replace(/\s/g, '')

        transaction.set(firestore.doc(`users/${uid}/accounts/${id}`), {
          name: encrypt(name, pass),
          code: encrypt(mappedCode, pass),
          createDate: firebase.firestore.FieldValue.serverTimestamp()
        })

        return id
      } else {
        throw new Error('Wrong password')
      }
    })
  })
}

export const toggleAccountDeleted = (id) => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error('Not logged in'))
  }

  if (!id) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid

  const ref = firestore.doc(`users/${uid}/accounts/${id}`)
  return firestore.runTransaction(transaction => {
    return transaction.get(ref).then(doc => {
      if (!doc.exists) {
        throw new Error('Account not found')
      }

      const isDeleted = !!doc.data().deleted

      transaction.update(ref, {
        deleted: isDeleted ? false : firebase.firestore.FieldValue.serverTimestamp()
      })
    })
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
          const decryptedName = decrypt(account.name, pass)
          const decryptedCode = decrypt(account.code, pass)

          if (decryptedName) {
            return {
              ...account,
              name: decryptedName,
              code: decryptedCode
            }
          }
          return null
        })
        .filter(Boolean)
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1
          }
          return 0
        })
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

export const authSetNoPersistence = () => auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
