import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const {registerUser, signInWithGoogle} = useAuth()
    const navigate = useNavigate()

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleGoogleSignup = async () => {
    try{
        await signInWithGoogle();
        navigate("/");
        alert("Account created successfully.");
    }
    catch(err){
        alert("Sign up failed...");
        setMessage(err.message);
    }
  }

    const onSubmit = async (data) => {
        try{
            await registerUser(data.email, data.password);
            setMessage("");
            alert("User registered successfully...");
            navigate("/");
        }
        catch(err){
            setMessage(err.message);
        } 
    }


  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>  
        <form onSubmit={handleSubmit(onSubmit)} className='w-88 h-98 rounded-md shadow-md shadow-discount p-8 flex items-center flex-col gap-2'>    
            <h2 className='text-yellow-500 font-secondary tracking-tighter font-semibold text-3xl'>Register</h2>
            {message && <p className='font-md font-secondary tracking-tighter text-red-400'>{message}</p>}
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='font-secondary tracking-tighter'>Email</label>
                <input {...register("email", { required: true })} type="email" name='email' id='email' className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary'/>
            </div>
            <div className='flex flex-col gap-2 items-start'>
                <div className='w-full flex gap-32 items-center'>
                    <label htmlFor = "password" className='font-secondary tracking-tighter'>Password</label>
                    <div>
                        {
                            showPassword ?
                            <div className='flex gap-2 items-center cursor-pointer select-none'>
                                <IoMdEye className='w-4 h-4 text-yellow-500' onClick={() => setShowPassword(!showPassword)}/>
                                <p className='text-yellow-600 tracking-tighter font-secondary' onClick={() => setShowPassword(!showPassword)}>Hide</p>
                            </div>
                            : 
                            <div className='flex gap-2 items-center cursor-pointer select-none'>
                                <IoMdEyeOff className='w-4 h-4 text-yellow-500' onClick={() => setShowPassword(!showPassword)}/>
                                <p className='text-yellow-600 tracking-tighter font-secondary' onClick={() => setShowPassword(!showPassword)}>Show</p>
                            </div>
                        }
                    </div>
                </div>
                <input {...register("password", { required: true })} type= {showPassword ? "text" : "password"} className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary'/>
            </div>
            <button type="submit" className='w-46 h-8 mt-6 bg-yellow-500 text-secondary flex items-center justify-center rounded-md'>
              Sign Up
            </button>
            <button onClick={handleGoogleSignup} className='w-68 h-8 bg-gray-700 flex items-center justify-center gap-2 text-white rounded-md my-2'>
                <FaGoogle />
                <p>Sign up with Google</p>
            </button>
            <div className='flex gap-2'>
                <p>ALready have an account?</p>
                <Link className='text-blue-500' to="/login">Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Register