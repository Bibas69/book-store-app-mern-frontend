import React from 'react'
import news1 from '../../assets/news1.jpg'
import news2 from '../../assets/news2.jpg'
import news3 from '../../assets/news3.jpg'
import news4 from '../../assets/news4.jpg'
import news5 from '../../assets/news5.jpg'

import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const News = () => {
    const news = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
        "image": news1
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
        "image": news2
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
        "image": news3
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
        "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
        "image": news4
    },
    {
        "id": 5,
        "title": "Innovative New Smartphone Released by Leading Tech Company",
        "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
        "image": news5
    }
]
  return (
    <div className='w-full min-h-[40vh] md:px-24 px-6 -mt-12'>
        <h2 className='text-primary font-primary font-semibold text-3xl mb-6'>News</h2>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {news.map((data, index) => (
            <SwiperSlide key={index}>
                <div className='md:min-h-44 min-h-112  flex flex-col md:flex-row gap-6 items-center md:items-start'>
                    <div className='flex flex-col gap-2 select-none'>
                        <Link to="/">
                            <h2 className='text-primary font-primary text-xl font-semibold'>{data.title}</h2>
                        </Link>
                        <div className='w-24 h-[4px] bg-general rounded-md'></div>
                        <p className='text-primary font-secondary'>{data.description}</p>
                    </div>
                    <div className='w-116 h-24'>
                        <img className='select-none' src={data.image} alt="" />
                    </div>
                </div>
            </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  )
}

export default News