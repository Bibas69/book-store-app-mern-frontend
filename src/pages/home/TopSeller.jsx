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

const TopSeller = () => {
  const {data:books = []} = useGetAllBooksQuery();
  console.log(books);
  
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

  const categories = ["Choose a genre", "Business", "Fiction", "Adventure", "Horror"]

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category &&
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        )

  return (
    <div className="w-full min-h-[60vh] py-8 md:px-24 px-6 flex flex-col gap-4">
      <div className="w-full flex flex-col justify-center">
        <h2 className="font-primary tracking-tighter text-3xl font-semibold">Top Sellers</h2>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-44 h-10 mt-4 outline-none border border-gray-300 bg-black-bg rounded-md"
          name="category"
          id="category"
          value={selectedCategory}
        >
          {categories.map((category, index) => (
            <option
              className="text-primary font-secondary"
              key={index}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>
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
        {filteredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TopSeller