import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import getBaseUrl from '../../utils/getBaseUrl';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = async (data) => {
        try{
            const response = await axios.post(`${getBaseUrl()}/api/auth/loginAdmin`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const auth = response.data;
            if(auth.token){
                localStorage.setItem("token", auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate("/admin")
                }, 3600*1000);
                alert("Login successful");
                navigate("/admin/dashboard")
            }
        }
        catch(err){
            setMessage(err.message);
        }
    }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-88 rounded-md flex flex-col gap-4 items-center py-8 shadow-lg shadow-gray-400'>
            {
                message && <p className='text-red-600 font-secondary tracking-tighter'>{message}</p>
            }
            <div className='w-full  flex items-center flex-col'>
                <label htmlFor="username" className='font-secondary tracking-tighter'>Username</label>
                <input className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary'  {...register("username", { required: true })} type="text" name='username' id='username' />
            </div>
            <div className='w-full flex items-center flex-col'>
                <label htmlFor="password" className='font-secondary tracking-tighter'>Password</label>
                <input className='bg-gray-200 w-72 h-8 p-2 rounded-md outline-none border-2 border-primary' {...register("password", { required: true })} type="password" name='password' id='password'/>
            </div>
            <button type='submit' className='font-secondary tracking-tighter bg-blue-500 w-44 rounded-md h-8'>Login</button>
        </form>
    </div>
  )
}

export default AdminLogin