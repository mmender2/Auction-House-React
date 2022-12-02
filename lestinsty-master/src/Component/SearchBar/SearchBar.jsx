import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Slider from '@mui/material/Slider'
import './search.css'

function valuetext(value) {
  return `${value}°C`
}

const SearchBar = () => {
  const [value, setValue] = React.useState([20, 37])

  const handleChangeRange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="searchBarContainer">
      <div className="searchBarContent">
        <div className="searchbrBox csRow justifyBetween">
          <FormControl
            sx={{ marginTop: 0, width: '56%' }}
            variant="outlined"
            //   color="error"
          >
            <InputLabel color="error" htmlFor="outlined-adornment-password">
              Search by Title
            </InputLabel>
            <OutlinedInput
              color="error"
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="error"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search by Title"
            />
          </FormControl>
          <div className="priceRange">
            <p className='bold'>Price Range:</p>
            <br />
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChangeRange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              color="error"
            />
            <div className="minMaxPr">
              <span>Min Price : $0</span>
              <span>Max Price : $1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
