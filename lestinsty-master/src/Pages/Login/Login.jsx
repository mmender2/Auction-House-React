import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoginSignupSide from './LoginSignupSide'
import './login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import logo from '../../assets/logoJim.svg'
// import google from '../../assets/google.svg'
import {  Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { database, auth } from '../../Config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref,  onValue } from 'firebase/database'
import * as yup from 'yup'
import { setCurrentUserData } from '../../globalState/authSlice'
import { useDispatch } from 'react-redux'
import ActionAlerts from '../../Component/Alert/Alert'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [loading, setLoading] = useState(false)
  let [showAlert, setAlert] = useState({ status: '', message: '', show: false })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup
        .string()
        .min(6, 'password is too Short!')
        .max(20, 'password is too Long!')
        .required('Password is required'),
    }),
    onSubmit: (value) => {
      // console.log(value)
      setLoading(true)
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          const user = userCredential.user
          let dbRef = ref(database, `users/${user.uid}`)
          onValue(dbRef, (snapshot) => {
            let result = snapshot.val()
            setAlert({
              status: 'succes',
              message: 'Successfully login',
              show: true,
            })
            dispatch(setCurrentUserData(result))

            navigate('/')
            setLoading(false)
          })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(error)
          setLoading(false)
          setAlert({
            status: 'error',
            message: 'Email or Password wrong!',
            show: true,
          })
          // ..
        })
    },
  })

  const handleCloseAlert = () => {
    setAlert({ show: false })
  }

  return (
    <div className="login_outer login">
      <div className="login_container">
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -window.innerWidth }}
          exit={{ x: -window.innerWidth }}
          transition={{ duration: 0.5 }}
          className="fixed_logo position-absolute"
        >
          <div className="fmLogo">
            <NavLink to={'/'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
        </motion.div>
        <motion.div
          className="login_content py-5"
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: window.innerWidth > 768 ? 432 : window.innerWidth,
            opacity: 0,
          }}
          initial={{
            x: window.innerWidth > 768 ? 432 : window.innerWidth,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="login_inner">
            <h1 className="font-weight-bold mt-4">Login to Your Account</h1>
            {/* <p>Login using social networks</p> */}
            {/* <div className="form_icons">
            
              <br />
              <Button
                variant="outlined"
                className="fulBtn"
                size="large"
                color="error"
                // onClick={}
              >
                <img src={google} alt="google" />
                <p>Continue With Google</p>
              </Button>
            </div> */}
            <form onSubmit={formik.handleSubmit} className="login_form">
              {/* <div className="w-100 mb-3 d-flex justify-content-center align-items-center">
                <div className="line"></div>
                <p className="mb-0 font-smaller px-3">OR</p>
                <div className="line"></div>
              </div> */}
              <div className="fields">
                <div className="acntField">
                  <TextField
                    color="error"
                    id="email"
                    label="Email"
                    name="email"
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    variant="outlined"
                    type={'email'}
                    className="csInp"
                  />
                </div>
                <div className="acntField">
                  <TextField
                    color="error"
                    id="password"
                    label="Password"
                    variant="outlined"
                    className="csInp"
                    type="password"
                    error={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null
                    }
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="linkdiv">
                  <Link to={'/forgot-password'}>Forgotten password</Link>
                </div>
              </div>
              <div className="btnDiv">
                <Button
                  variant="contained"
                  className="fulBtn bold"
                  size="large"
                  color="error"
                  type="submit"
                  disabled={loading}
                >
                  {!loading ? 'Login' : 'Loading...'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
        <LoginSignupSide
          type="signup_page"
          heading="New Here?"
          text="Sign up and discover a great amount of new opportunities!"
          link="/signup"
          linkText="Sign Up"
          x={-1}
        />
        {showAlert.show ? (
          <ActionAlerts
            onClick={handleCloseAlert}
            status={showAlert.status}
            message={showAlert.message}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Login
