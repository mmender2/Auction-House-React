import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
// import banner from '../../assets/banner.jpg'
// import banner5 from '../../assets/banner5.jpg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation, Autoplay } from 'swiper'

const Banner = () => {
  return (
    <div className="bannerContainer">
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={banner4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner
