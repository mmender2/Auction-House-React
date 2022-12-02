import React, { useEffect } from 'react'
import Footer from '../../Component/Footer/Footer'
import DrawerAppBar from '../../Component/Header/Header'
import './profile.css'
import SideTabs from './SideTabs'

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <DrawerAppBar />
      <div className="profielContainer">
        <SideTabs />
        <Footer />
      </div>
    </div>
  )
}

export default Profile
