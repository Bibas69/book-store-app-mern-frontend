import React from 'react'
import banner from '/src/assets/banner.png'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <div className='w-full h-[100vh] md:h-[75vh] flex flex-col md:flex-row-reverse px-6 md:px-26 my-6'>
        <div className="right w-[50%] h-full flex items-center justify-end w-full">
          <img src={banner} alt="banner"/>
        </div>
        <div className="left w-full md:w-[50%] h-full flex flex-col justify-center gap-4 py-14">
            <h1 className='text-2xl md:text-5xl text-primary font-primary'>New Releases This Week</h1>
            <p className='text-lg tracking-tighter font-secondary'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
            <a href="#footer"><button className='min-h-10 w-44 bg-general text-secondary font-secondary rounded-md mt-2'>Subscribe</button></a>
        </div>
    </div>
  )
}

export default Banner