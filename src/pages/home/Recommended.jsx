import React, { useEffect, useState } from 'react'
import BookCard from '../book/BookCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { useGetAllBooksQuery } from '../../redux/features/books/bookApi'

const Recommended = () => {
    const {data:books=[]} = useGetAllBooksQuery();
    console.log("books: ", books);
  return (
    <div className='w-full min-h-[60vh] md:px-24 px-6 mt-8'>
        <h2 className='text-primary font-primary text-3xl tracking-tighter mb-6 font-semibold'>Recommended</h2>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{ width: "100%" }}
      >
        {books.length > 0 && books.slice(8, 18).map((book, index) => (
            <SwiperSlide key={index}>
                <BookCard book = {book}/>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Recommended