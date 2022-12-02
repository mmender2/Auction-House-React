import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginSignupSide from "../Login/LoginSignupSide";
import "../Login/login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../../assets/logoJim.svg";
// import google from '../../assets/google.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { auth } from "../../Config/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
// import { ref, onValue } from "firebase/database";
import * as yup from "yup";
// import { setCurrentUserData } from "../../globalState/authSlice";
import { useDispatch } from "react-redux";
import ActionAlerts from "../../Component/Alert/Alert";

const ForgotPassword = () => {
  let [loading, setLoading] = useState(false);
  let [showAlert, setAlert] = useState({
    status: "",
    message: "",
    show: false,
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (value) => {
      // console.log(value)
      setLoading(true);
      sendPasswordResetEmail(auth, value.email)
        .then((res) => {
          //   console.log("reset password", res, value.email);
          setLoading(false);
          setAlert({
            status: "success",
            message:
              "Email has been sent in to your email so you can easily set your new password!",
            show: true,
          });
          handleCloseTimeOut()

          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setAlert({
            status: "error",
            message: "Email or Password wrong!",
            show: true,
          });
          handleCloseTimeOut()
          // ..
        });
    },
  });

 const  handleCloseTimeOut = ()=>{
     setTimeout(()=>{
       setAlert({
        show:false
       })
     },1200)
  }

  const handleCloseAlert = () => {
    setAlert({ show: false });
  };

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
            <NavLink to={"/"}>
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
            <h1 className="font-weight-bold mt-4">Forgot Your Password?</h1>
            <form onSubmit={formik.handleSubmit} className="login_form">
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
                    type={"email"}
                    className="csInp"
                  />
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
                  {!loading ? "Reset Password" : "Loading..."}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
        <LoginSignupSide
          type="signup_page"
          heading="Reset Password"
          text="You can easily reset your password! "
          link="/login"
          linkText="Login"
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
  );
};

export default ForgotPassword;
