import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation,Autoplay } from 'swiper'
import { data } from '../../Pages/Home/ItemList'
import './featureProduct.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const FeatureProducts = () => {
  return (
    <div className="ftrProductContainer">
      <div className="ftrProdctContent">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination,Autoplay]}
          className="mySwiperProduct"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
          }}
        >
          {data.map((val,i) => (
            <SwiperSlide key={i}>
              <div className="ftrProduct">
                <div className="ftrPtImg">
                  <img src={val.url} alt="" />
                </div>
                <div className="ftrPtBod">
                  <h3>{val.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default FeatureProducts
