import React, { useEffect } from 'react'
import DrawerAppBar from '../../Component/Header/Header'
import ItemList from '../Home/ItemList'
import Heading from '../../Component/Heading/Heading'
import SearchBar from '../../Component/SearchBar/SearchBar'
import Footer from '../../Component/Footer/Footer'
import FeatureCard from '../Home/FeatureCard'
import BreadCrumbs from '../../Component/BreadCrumbs/BreadCrumbs'
import './categoryPage.css'
import FeatureProducts from '../../Component/FeaturedProducts/FeatureProducts'


const CategoryItemPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
 },[])
 
  return (
    <div>
      <DrawerAppBar />
      <div className="ctgItmPgContent">
        <Heading head={'Electronics:'} />
        <br />
        <BreadCrumbs />
        <SearchBar />
        <ItemList />
      </div>
      <Heading head={'Related Products'} />
      <br />
      <FeatureProducts />
      <br />
      <br />
      <FeatureCard />
      <Footer />
    </div>
  )
}

export default CategoryItemPage
