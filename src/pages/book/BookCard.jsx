import React from 'react'
import { getImgUrl } from '../../utils/getImageUrl'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const BookCard = ({book}) => {

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className='flex mb-8 shadow min-h-[35vh]'>
        <Link to={`/book/${book._id}`}>
            <div className="left flex items-center justify-center">
                <img
                  className='h-full transition-transform duration-200 hover:scale-105'
                  src={getImgUrl(book.coverImage)}
                  alt=""
                />
            </div>
        </Link>
        <div className="right flex flex-col gap-4 items-center pt-2">
            <Link to={`/books/${book._id}`}>
                <h2 className='text-primary font-primary tracking-tighter font-semibold'>{book.title.length > 30 ? `${book.title.slice(0, 30)}...`: book.title}</h2>
            </Link>
            <p className='text-primary font-secondary tracking-tighter text-center'>
              {book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
            </p>
            <div className="w-full h-12 flex gap-12 items-center justify-center font-secondary">
                <p>${book.newPrice}</p>
                <p className='line-through text-discount'>${book.oldPrice}</p>
            </div>
            <div className='flex gap-2 items-center bg-general w-36 h-10 rounded-md justify-center mt-2 transition duration-200 hover:bg-yellow-400 cursor-pointer'>
                <AiOutlineShoppingCart className='size-6 font-light'/>
                <p onClick={() => handleAddToCart(book)} className='font-secondary'>Add to cart</p>
            </div>
        </div>
    </div>
  )
}

export default BookCard