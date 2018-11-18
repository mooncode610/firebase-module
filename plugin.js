import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/auth'

export default function({ app }, inject) {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    if (process.env.NODE_ENV === 'production') {
      firebase.initializeApp(options.config)
      console.log("Intialized production config")
    } else {
      firebase.initializeApp(options.devConfig)
      console.log("Intialized development config")
    }
  }

  let _fireStore, _fireFunc, _fireStorage, _fireAuth
  if (!options.useOnly || options.useOnly.includes('firestore')) {
    firebase.firestore().settings({ timestampsInSnapshots: true })
    _fireStore = firebase.firestore()
    inject('fireStore', _fireStore)
  }

  if (!options.useOnly || options.useOnly.includes('functions')) {
    _fireFunc = firebase.functions()
    inject('fireFunc', _fireFunc)
  }

  if (!options.useOnly || options.useOnly.includes('storage')) {
    _fireStorage = firebase.storage()
    inject('fireStorage', _fireStorage)
  }

  if (!options.useOnly || options.useOnly.includes('auth')) {
    const _fireAuth = firebase.auth()
    inject('fireAuth', _fireAuth)
  }
}
