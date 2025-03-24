import React from 'react'
import ExploreComp from './components/Explore'
import Navbar from '@/components/nabvar'
import Footer from '@/components/footer'

function Explore() {
  return (
    <div>
      <Navbar/>
      <ExploreComp />
      <Footer />
    </div>
  )
}

export default Explore