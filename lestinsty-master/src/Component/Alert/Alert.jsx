import * as React from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import './alert.css'

export default function ActionAlerts({message , status , onClick}) {
  return (
    <div className='alrtContainer'>
      <Stack sx={{ width: '100%' }}  spacing={2}>
        <Alert onClose={onClick} color='' severity={status}>
          {message}
        </Alert>
      </Stack>
    </div>
  )
}
