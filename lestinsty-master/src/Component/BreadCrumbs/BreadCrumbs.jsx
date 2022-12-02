import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}
const BreadCrumbs = () => {
  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingLeft: '15px' }}>
          <Link underline="hover" color="inherit"  href="/home">
            Home
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            Breadcrumbs
          </Link>
        </Breadcrumbs>
      </div>
    </div>
  )
}

export default BreadCrumbs
