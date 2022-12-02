import { Button } from '@mui/material'
import React from 'react'

const FeatureCard = () => {
  return (
    <div className="ftrContainer">
      <div className="ftrSectin">
        <div className="ftrContent">
          <div className="ftrBox csRow justifyBetween">
            <div className="ftrCard">
              <img
                src="https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg"
                alt=""
              />
              <div className="ftrCdBody">
                <h3>Electronics</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid esse
                </p>
                <Button variant="contained" color="error">
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="ftrCard">
              <img
                src="https://c8.alamy.com/comp/2GBAYYD/texture-of-mobile-phone-accessories-on-a-denim-background-2GBAYYD.jpg"
                alt=""
              />
              <div className="ftrCdBody">
                <h3>Mobile Phones</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid esse
                </p>
                <Button variant="contained" color="error">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
