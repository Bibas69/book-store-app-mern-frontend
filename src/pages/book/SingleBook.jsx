import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBookByIdQuery } from '../../redux/features/books/bookApi';
import { getImgUrl } from '../../utils/getImageUrl';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const SingleBook = () => {
    const {id} = useParams();
    const {data:book, isLoading, isError} = useGetBookByIdQuery(id);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error to load book info...</div>

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-112 h-fit-content shadow-md shadow-zinc-500 rounded-md flex flex-col gap-4 items-center -mt-30 p-4'>
            <h2 className='text-primary font-primary font-semibold text-2xl'>{book.title}</h2>
            <img className='h-54 w-32' src={getImgUrl(book.coverImage)} alt={book.title} />
            <p><span className='font-semibold'>Published </span>{new Date(book.createdAt).toLocaleDateString()}</p>
            <p className='text-lg text-primary font-secondary '><span className='font-semibold pr-2'>Description:</span>{book.description}</p>
            <div className='flex gap-12'>
                <p className='text-lg'>${book.newPrice}</p>
                <p className='text-discount line-through text-lg'>${book.oldPrice}</p>
            </div>
            <div className='flex gap-2 items-center bg-general w-36 h-10 rounded-md justify-center transition duration-200 hover:bg-yellow-400 cursor-pointer'>
                <AiOutlineShoppingCart className='size-6 font-light'/>
                <p onClick={() => handleAddToCart(book)} className='font-secondary'>Add to cart</p>
            </div>
        </div>
    </div>
  )
}

export default SingleBook