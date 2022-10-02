import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut
} from 'firebase/auth'
import {
  collection,
  doc,
  getFirestore,
  runTransaction,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { collectionData, docData } from 'rxfire/firestore'
import { map } from 'rxjs/operators'

import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'
import { nanoid } from 'nanoid'

export const encrypt = (message, pass) => aes.encrypt(message, pass).toString()
export const decrypt = (message, pass) => aes.decrypt(message, pass).toString(encUtf8)

initializeApp({
  apiKey: 'AIzaSyAJYuy1Qs3WZ_Ne0Y7VsnYFKxx9ut3O7_w',
  authDomain: 'otp-gbur.firebaseapp.com',
  databaseURL: 'https://otp-gbur.firebaseio.com',
  projectId: 'otp-gbur',
  storageBucket: 'otp-gbur.appspot.com',
  messagingSenderId: '884103461990',
  appId: '1:884103461990:web:908955f698082d615c41a7'
})

export const addAccount = (name, code, pass) => {
  const user = getAuth().currentUser

  if (!user) {
    return Promise.reject(new Error('Not logged in'))
  }

  if (!name || !code || !pass) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid

  return runTransaction(getFirestore(), transaction => {
    return transaction.get(doc(getFirestore(), `users/${uid}`)).then(docData => {
      if (!docData.exists) {
        throw new Error('User key does not exist')
      }

      const userKey = docData.data().key

      if (decrypt(userKey, pass)) {
        const id = nanoid()

        const mappedCode = code.replace(/\s/g, '')

        transaction.set(doc(getFirestore(), `users/${uid}/accounts/${id}`), {
          name: encrypt(name, pass),
          code: encrypt(mappedCode, pass),
          createDate: serverTimestamp()
        })

        return id
      } else {
        throw new Error('Wrong password')
      }
    })
  })
}

export const toggleAccountDeleted = id => {
  const user = getAuth().currentUser

  if (!user) {
    return Promise.reject(new Error('Not logged in'))
  }

  if (!id) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid

  const ref = doc(getFirestore(), `users/${uid}/accounts/${id}`)
  return runTransaction(getFirestore(), transaction => {
    return transaction.get(ref).then(doc => {
      if (!doc.exists) {
        throw new Error('Account not found')
      }

      const isDeleted = !!(doc.data() as Account).deleted

      transaction.update(ref, {
        deleted: isDeleted ? false : serverTimestamp()
      })
    })
  })
}

export const streamAccounts = pass => {
  const user = getAuth().currentUser

  if (!user) {
    throw new Error('Not logged in')
  }

  if (!pass) {
    throw new Error('Missing parameters')
  }

  const uid = user.uid

  const ref = collection(getFirestore(), `users/${uid}/accounts`)

  return collectionData(ref, { idField: 'id' }).pipe(
    map(accounts =>
      accounts
        .map(account => {
          const decryptedName = decrypt(account.name, pass)
          const decryptedCode = decrypt(account.code, pass)

          if (decryptedName) {
            return {
              ...account,
              createdAt: account.createDate.toDate(),
              deleted: account.deleted ? account.deleted.toDate() : false,
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
        .reduce(
          (acc, account) => {
            if (account.deleted) {
              acc.trash.push(account)
            } else {
              acc.accounts.push(account)
            }
            return acc
          },
          {
            accounts: [],
            trash: []
          }
        )
    )
  )
}

export const streamUserKey = () => {
  const user = getAuth().currentUser

  if (!user) {
    throw new Error('Not logged in')
  }

  const uid = user.uid

  return docData(doc(getFirestore(), `users/${uid}`), { idField: 'id' }).pipe(
    map(user => (user ? user.key : null))
  )
}

export const createUserKey = pass => {
  const user = getAuth().currentUser

  if (!user) {
    return Promise.reject(new Error('Not logged in'))
  }

  if (!pass) {
    return Promise.reject(new Error('Missing parameters'))
  }

  const uid = user.uid

  return setDoc(doc(getFirestore(), `users/${uid}`), {
    key: encrypt(new Date().toString(), pass)
  })
}

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password)
}

export const signOut = () => fbSignOut(getAuth())

export const watchUser = cb => {
  return onAuthStateChanged(getAuth(), cb)
}
