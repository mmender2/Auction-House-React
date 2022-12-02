import { useEffect } from 'react'
import './App.css'
import AppRouter from './Router/Router'
import { auth } from './Config/FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { setCurrentUserData } from './globalState/authSlice'
import { useDispatch } from 'react-redux'
import { database } from './Config/FirebaseConfig'
import { ref, onValue } from 'firebase/database'
import Loader from './Component/Loader/Loader'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid
          let dbRef = ref(database, `users/${uid}`)
          onValue(dbRef, (snapshot) => {
            let result = snapshot.val()
            // console.log(result)
            dispatch(setCurrentUserData(result))
          })
        } else {
        }
      })
    }
    getUser()
  }, [])

  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
