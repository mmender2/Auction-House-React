import React from 'react'
import logo from '../../assets/logoJim.svg'
import './loader.css'

const Loader = () => {
  return (
    <div className="content">
      <div className="loading">
        <img src={logo} alt="logo" />
        <span></span>
      </div>
    </div>
  )
}

export default Loader
