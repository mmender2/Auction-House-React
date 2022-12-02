import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LoginSignupSide from '../Login/LoginSignupSide'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import logo from '../../assets/logoJim.svg'
// import google from '../../assets/google.svg'
import {  NavLink, useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import { database, auth } from '../../Config/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import * as yup from 'yup'
import { setCurrentUserData } from '../../globalState/authSlice'
import { useDispatch } from 'react-redux'
import ActionAlerts from '../../Component/Alert/Alert'

const currencies = [
  {
    value: 'Seller',
    label: 'Seller',
  },
  {
    value: 'Buyer',
    label: 'Buyer',
  },
]

const Signup = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [showAlert, setAlert] = useState({ status: '', message: '', show: false })
  const [role, setRole] = React.useState('Buyer')
  let [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    setRole(event.target.value)
  }

  const [values, setValues] = React.useState({
    showPassword: false,
    showCPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showCPassword: !values.showCPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  // const SignupSchema =

  let formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
      // role: '',
    },
    validationSchema: yup.object().shape({
      fullName: yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      number: yup.number().required('Required'),
      email: yup.string().email('Invalid email').required('Required'),
      password: yup
        .string()
        .min(6, 'password is too Short!')
        .max(20, 'password is too Long!')
        .required('Password is required'),

      confirmPassword: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
          return this.parent.password === value
        }),
    }),
    onSubmit: (value) => {
      setLoading(true)
      createUserWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          let userData = {
            name: value.fullName,
            email: value.email,
            number: value.number,
            userId: user.uid,
            role: role,
          }

          set(ref(database, `/users/${user.uid}`), userData)
            .then((res) => {
              console.log('user added', res)
              dispatch(setCurrentUserData(userData))
              navigate('/')
              setLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
              setAlert({
                status: 'error',
                message: 'Something went wrong!',
                show: true,
              })
            })
          // let userId = userCredential.providerId
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(error)
          setLoading(false)
          setAlert({
            status: 'error',
            message: 'Account already exist!',
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
    <div className="login_outer regestration">
      {showAlert.show ? (
        <ActionAlerts
          onClick={handleCloseAlert}
          status={showAlert.status}
          message={showAlert.message}
        />
      ) : null}
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
        <LoginSignupSide
          type="login_page"
          heading="One Of Us?"
          text="If you already have an account, just sign in. We've missed you!"
          link="/login"
          linkText="Login"
          x={1}
        />
        <motion.div
          className="login_content signupContent py-5"
          initial={{
            x: window.innerWidth > 768 ? -432 : -window.innerWidth,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: window.innerWidth > 768 ? -432 : -window.innerWidth,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="login_inner">
            <h1 className="font-weight-bold">Create Free Account</h1>
            {/* <p>Sign up using social networks</p> */}
            {/* <div className="form_icons">
              <br />
              <Button
                variant="outlined"
                className="fulBtn"
                size="large"
                color="error"
              >
                <img src={google} alt="google" />
                <p>Continue With Google</p>
              </Button>
            </div> */}
            <form onSubmit={formik.handleSubmit} className="req_form signForm">
              {/* <div className="w-100 mb-3 d-flex justify-content-center align-items-center">
                <div className="line"></div>
                <p className="mb-0 font-smaller px-3">OR</p>
                <div className="line"></div>
              </div> */}
              <div className="hfSignFIeld">
                <div className="acntField">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Role"
                    value={role}
                    className="csInp"
                    color="error"
                    onChange={handleChange}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="acntField">
                  <TextField
                    color="error"
                    id="fullName"
                    label="Full Name"
                    variant="outlined"
                    type={'text'}
                    className="csInp"
                    value={formik.values.fullName}
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                        ? formik.errors.fullName
                        : null
                    }
                    error={
                      formik.touched.fullName && formik.errors.fullName
                        ? true
                        : false
                    }
                    name="fullName"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="hfSignFIeld">
                <div className="acntField">
                  <TextField
                    color="error"
                    id="number"
                    label="Phone"
                    //   helperText="Incorrect entry."
                    variant="outlined"
                    type={'number'}
                    className="csInp"
                    value={formik.values.number}
                    name="number"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="acntField">
                  <TextField
                    color="error"
                    id="email"
                    label="Email"
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    variant="outlined"
                    type={'email'}
                    className="csInp"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                  />
                </div>
              </div>
              <div className="hfSignFIeld">
                <div className="acntField">
                  <FormControl
                    sx={{ m: 0, width: '100%' }}
                    // error
                    variant="outlined"
                    color="error"
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      color="error"
                      id="password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      name="password"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password && formik.errors.password
                          ? true
                          : false
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="error"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error_msg">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="acntField">
                  <FormControl
                    sx={{ m: 0, width: '100%' }}
                    // error
                    variant="outlined"
                    color="error"
                  >
                    <InputLabel htmlFor="confirmPassword">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      type={values.showCPassword ? 'text' : 'password'}
                      value={formik.values.confirmPassword}
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? true
                          : false
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="error"
                          >
                            {values.showCPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error_msg">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
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
                  {!loading ? 'Sign Up' : 'Loading...'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
