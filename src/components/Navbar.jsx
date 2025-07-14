import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import avatarImg from '../assets/avatar.png'
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const {currentUser, signOutUser} = useAuth();
    const navigate = useNavigate();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const navigation = [
        {name: "Home", href: "/"},
        {name: "Orders", href: "/orders"},
        {name: "Cart", href: "/cart"},
        {name: "Check Out", href: "/checkout"},
    ];

    const handleLogout = () => {
        try{
            signOutUser();
            setIsDropDownOpen(false);
            navigate("/login")
            alert("Logged out...");
        }
        catch(err){
            alert(err.message);
        }
    }

    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems);
  return (
    <header className='w-full h-[80px] flex items-center md:justify-center pt-4'>
        <nav className='w-[90%] h-[36px] flex items-center justify-between p-0 md:p-6'>
            <div className="left flex gap-8 items-center">
                <Link to="/">
                    <HiMenuAlt1 className='size-6'/>
                </Link>
                <div className="search flex gap-2 bg-black-bg w-72 h-8 rounded-md items-center text-left">
                    <IoMdSearch className='w-[24px] h-[18px]'/>
                    <input type="text" placeholder='What are you looking for?' className='outline-none font-secondary'/>
                </div>
            </div>
            <div className="right flex items-center gap-6">
                {
                    currentUser ?
                    <div>
                        <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                            <img src={avatarImg} alt="image" className='relative size-6 ring-2 rounded-full ring-[blue]' />
                        </button>
                        {
                            isDropDownOpen && (
                                <div className='absolute mt-2 right-40 text-center bg-secondary shadow-lg w-38'>
                                    <ul>
                                        {navigation.map((item) => (
                                            <li key={item.name} onClick={() => setIsDropDownOpen(false)} className='hover:bg-black-bg font-secondary py-1'>
                                                <Link to={item.href}>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className='w-full flex items-center justify-center mb-2 cursor-pointer' onClick={handleLogout}>Logout</button>
                                </div>
                            )
                        }
                    </div>
                    :
                    <Link to="/login">
                        <CgProfile className='size-6'/>
                    </Link>
                }
                <Link to="/favourite">
                <GrFavorite className='size-6'/>
                </Link>
                <Link to="/cart" className='flex gap-2 items-center bg-general w-16 h-8 rounded-md justify-center'>
                    <AiOutlineShoppingCart className='size-6 font-light'/>
                    {
                        cartItems.length > 0 && <p className='font-secondary'>{cartItems.length}</p>
                    }   
                </Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar