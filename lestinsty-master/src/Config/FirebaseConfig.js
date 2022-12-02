// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage,ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA2Ja15mzWEsMmPP2uLOalMTm4ZIYUqAkU',
  authDomain: 'lestinsky-bed32.firebaseapp.com',
  projectId: 'lestinsky-bed32',
  storageBucket: 'lestinsky-bed32.appspot.com',
  messagingSenderId: '1004341961274',
  appId: '1:1004341961274:web:43f4f94e518aec8ad8cb03',
  measurementId: 'G-90ZFQTKCH4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
let auth = getAuth(app)
let database = getDatabase(app)
let storage = getStorage(app)
let storageRef = (refrence)=> ref(storage , refrence)


export { auth, database, storage , storageRef }
