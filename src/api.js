import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

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
