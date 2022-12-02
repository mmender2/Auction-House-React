import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const LoginSignupSide = ({ type, heading, link, text, linkText, x }) => {
  return (
    <>
      <div className="flapper"></div>
      <motion.div
        animate={{ x: 0 }}
        exit={{
          x:
            window.innerWidth > 768
              ? (window.innerWidth - 432) * x
              : window.innerWidth * x,
        }}
        initial={{
          x:
            window.innerWidth > 768
              ? (window.innerWidth - 432) * x
              : window.innerWidth * x,
        }}
        transition={{ duration: 0.5 }}
        className={`login_side_container ${type}`}
      >
        <div className="side_content_wrapper">
          <motion.div
            className="motion_content text-center"
            animate={{ x: 0 }}
            initial={{ x: -(window.innerWidth * x) }}
            exit={{ x: -(window.innerWidth * x) }}
            transition={{ duration: 0.5 }}
          >
            <div className="text_login_wrapper">
              <h1 className="text-white font-weight-bold">{heading}</h1>
              <p className="login_text">{text}</p>
            </div>
            <Link to={link} className="swap_btn text-decoration-none">
              {linkText}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default LoginSignupSide
