import React, { useEffect } from 'react'
import CardItem from '../../Component/Card/Card'
import DrawerAppBar from '../../Component/Header/Header'
import ItemList from './ItemList'
import './home.css'
import Banner from './Banner'
import Heading from '../../Component/Heading/Heading'
import Categories from './Categories'
import FeatureCard from './FeatureCard'
import Footer from '../../Component/Footer/Footer'
import FeatureProducts from '../../Component/FeaturedProducts/FeatureProducts'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <DrawerAppBar />
      <Banner />
      <Heading head={'Categories'} />
      <Categories />
      <Heading head={'Featured Products'} />
      <ItemList />
      <Heading head={'OFFERS'} />
      <FeatureCard />
      <Heading head={'Most Popular Products'} />
      <FeatureProducts />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default Home
