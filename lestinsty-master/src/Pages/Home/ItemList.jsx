import React from 'react'
import CardItem from '../../Component/Card/Card'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
// import Filters from './Fitlers'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export let data = [
  {
    price: 35,
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPW_EyCaIboH8Y0JSa_3jzVdeNJxhU_Lp600y48DyivTHh4z5Kkt9VvlDrjnlkk2y8YG0&usqp=CAU',
    title: 'Airpods',
    id: '001',
  },
  {
    price: 475,
    url: 'https://m.media-amazon.com/images/I/614cZL1O0SL._SX425_.jpg',
    title: 'Oven',
    id: '002',
  },
  {
    price: 34,
    url: 'https://swagbeat.com/wp-content/uploads/2021/04/apple-handfree-1.jpg',
    title: 'Hands-Free',
    id: '003',
  },
  {
    price: 35,
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPW_EyCaIboH8Y0JSa_3jzVdeNJxhU_Lp600y48DyivTHh4z5Kkt9VvlDrjnlkk2y8YG0&usqp=CAU',
    title: 'Airpods',
    id: '001',
  },
  {
    price: 475,
    url: 'https://m.media-amazon.com/images/I/614cZL1O0SL._SX425_.jpg',
    title: 'Oven',
    id: '002',
  },
  {
    price: 34,
    url: 'https://swagbeat.com/wp-content/uploads/2021/04/apple-handfree-1.jpg',
    title: 'Hands-Free',
    id: '003',
  },
  {
    price: 35,
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPW_EyCaIboH8Y0JSa_3jzVdeNJxhU_Lp600y48DyivTHh4z5Kkt9VvlDrjnlkk2y8YG0&usqp=CAU',
    title: 'Airpods',
    id: '001',
  },
  {
    price: 475,
    url: 'https://m.media-amazon.com/images/I/614cZL1O0SL._SX425_.jpg',
    title: 'Oven',
    id: '002',
  },
  {
    price: 34,
    url: 'https://swagbeat.com/wp-content/uploads/2021/04/apple-handfree-1.jpg',
    title: 'Hands-Free',
    id: '003',
  },
  {
    price: 45,
    url: 'https://static-01.daraz.pk/p/0356c491c657e362bc506a83d27d5c12.jpg',
    title: 'Hand Press Juicer',
    id: '004',
  },
  {
    price: 61,
    url:
      'http://cdn.shopify.com/s/files/1/0326/1923/3339/products/RL015-CrownCeilingFan-01_grande.jpg?v=1611661672',
    title: 'Royal Fan',
    id: '005',
  },
  {
    price: 345,
    url: 'https://gujranwalabazar.pk/wp-content/uploads/2021/04/14000-min.jpg',
    title: 'Washing Machine',
    id: '006',
  },
  {
    price: 645,
    url:
      'https://images.samsung.com/is/image/samsung/assets/us/explore/family-hub/overview/6282022/FamilyHub-MLP-Smart-Home-MO-01_V2.jpg?$FB_TYPE_B_JPG$',
    title: 'Fridge',
    id: '007',
  },
  {
    price: 235,
    url:
      'https://images.philips.com/is/image/philipsconsumer/909cd38e84f3469ea8ccad1e00cdbb83?$jpglarge$&wid=960',
    title: 'Juicer',
    id: '008',
  },
]

const ItemList = () => {
  return (
    <div className="itemContainer">
      <div className="itmContent">
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 1300,
            margin: '0px auto',
            padding: '0px 10px',
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.map((val, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <CardItem data={val} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default ItemList
