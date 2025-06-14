import React from 'react'
import Hero from '../components/Home/Hero'
import FeaturedManga from '../components/Home/FeaturedManga'
import Categories from '../components/Home/Categories'
import TrendingNow from '../components/Home/TrendingNow'
import Testimonials from '../components/Home/Testimonials'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white'>
      <Hero/>
      <FeaturedManga/>
      <TrendingNow/>
      <Categories/>
      <Testimonials/>
    </div>
  )
}

export default Home

