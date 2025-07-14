import React from 'react'
import Banner from './Banner'
import TopSeller from './TopSeller'
import Recommended from './Recommended'
import News from './News'

const Home = () => {
  return (
    <div className='flex flex-col'>
        <Banner/>
        <TopSeller/>
        <Recommended/>
        <News/>
    </div>
  )
}

export default Home