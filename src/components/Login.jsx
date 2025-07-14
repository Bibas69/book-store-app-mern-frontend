import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const {loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleGoogleSignIn = async () => {
    try{
        await signInWithGoogle();
        navigate("/");
        alert("Login successful");
    }
    catch(err){
        setMessage(err.message);
        alert("Sign in failed...")
    }
  }

    const onSubmit = async (data) => {
        try{
            await loginUser(data.email, data.password);
            alert("Login successful");
            navigate("/");
            setMessage("");
            
        }
        catch(err){
            setMessage(err.message);
        }
    }

  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>  
        <form onSubmit={handleSubmit(onSubmit)} className='w-88 h-122 rounded-md shadow-md shadow-discount p-8 flex items-center flex-col gap-2'>    
            <h2 className='text-yellow-500 font-secondary tracking-tighter font-semibold text-3xl'>Log in</h2>
            {message && <p className='text-red-400 font-secondary font-md tracking-tighter'>{message}</p>}
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='font-secondary tracking-tighter'>Email</label>
                <input {...register("email", { required: true })} type="email" name='email' id='email' className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary'/>
            </div>
            <div className='flex flex-col gap-2 items-start'>
                <div className='w-full flex gap-32 items-center'>
                    <label htmlFor="password" className='font-secondary tracking-tighter'>Password</label>
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
                <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary'/>
            </div>
            <button type='submit' className='w-46 h-8 mt-6 bg-yellow-500 text-secondary flex items-center justify-center rounded-md'>Login</button>
            <button onClick={handleGoogleSignIn} className='w-68 h-8 bg-gray-700 flex items-center justify-center gap-2 text-white rounded-md my-2'>
                <FaGoogle />
                <p>Sign in with Google</p>
            </button>
            <div className='w-full flex flex-col gap-2'>
                <Link to="/forgotPassword" className='text-blue-500 font-secondary tracking-tighter'>Forgot password?</Link>
                <div>
                    <p>Don't have an account?</p>
                    <Link to="/register" className='text-blue-500 font-secondary tracking-tighter'>Create an account</Link>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login