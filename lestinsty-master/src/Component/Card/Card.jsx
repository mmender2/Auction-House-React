import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import logo from '../../assets/logoJim.png'
import { useNavigate } from 'react-router-dom'
import './card.css'

export default function CardItem({ data }) {
  let navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/products')
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }} onClick={handleNavigate}>
      <CardActionArea className="">
        <Typography
          gutterBottom
          variant="h6"
          sx={{ padding: '5px 10px' }}
          className=" bold"
          component="div"
        >
          {data.title}
        </Typography>
        <CardMedia
          component="img"
          height="250"
          image={data.url}
          alt="green iguana"
          className="csCdImg"
        />
        <CardContent className="cardContent">
          {/* <Typography gutterBottom variant="h6" className='colorRed bold' component="div">
            {data.title}
          </Typography> */}
          <Typography
            variant="body2"
            className="bdPrice"
            color="text.secondary"
          >
            Starting Bid : ${data.price}
          </Typography>
          <div className="timerBox ">
            <div className="tmEle">
              <span className="time">05</span>
              <span className="timeLabel">Hour</span>
            </div>
            <div className="tmEle">
              <span className="time">45</span>
              <span className="timeLabel">Mins</span>
            </div>
            <div className="tmEle">
              <span className="time">23</span>
              <span className="timeLabel">Sec</span>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className="txtRight justifyCenter cardContent">
        <Button
          size="large"
          sx={{ textTransform: 'capitalize', width: '100%' }}
          variant="outlined"
          className="txtRight bold cardBdBtn"
          color="error"
        >
          Bid Now
        </Button>
      </CardActions>
    </Card>
  )
}
