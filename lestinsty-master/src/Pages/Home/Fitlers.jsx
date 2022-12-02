import React from 'react'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import FormHelperText from '@mui/material/FormHelperText'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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

function valuetext(value) {
  return `${value}°C`
}

const Filters = () => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  //   const handleChange = (prop) => (event) => {
  //     setValues({ ...values, [prop]: event.target.value })
  //   }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [currency, setCurrency] = React.useState('EUR')

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  const [value, setValue] = React.useState([20, 37])

  const handleChangeRange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="fltrContainer">
      <div className="fltrSection">
        <h2 className='colorRed'>Filters:</h2>
        <div className="fltrBox">
          <div className="fltrFild">
            {/* <p></p> */}
            <FormControl
              sx={{ marginTop: 0, width: '100%' }}
              variant="outlined"
              color="error"
            >
              <InputLabel  color='error' htmlFor="outlined-adornment-password">
                Search by Title
              </InputLabel>
              <OutlinedInput
                color="error"
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end" >
                    <IconButton
                      color='error'
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search by Title"
              />
            </FormControl>
          </div>
          <div className="fltrFild">
            <TextField
              id="outlined-select-currency"
              select
              label="Select Category"
              //   value={currency}
              className="csInp"
              error
              onChange={handleChange}
              //   helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="fltrFild">
            <p>Price:</p>
            <br /> <br />
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChangeRange}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              color="error"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
