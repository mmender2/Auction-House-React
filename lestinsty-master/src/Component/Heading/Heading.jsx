import React from 'react'
import './heading.css'

const Heading = ({head}) => {
  return (
    <div className='headdngContainer'>
        <div className="headingContent">
            <h2 className='heading'>{head}</h2>
        </div>
    </div>
  )
}

export default Heading