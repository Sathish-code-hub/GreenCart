import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const SellerLogin = () => {

    const {isSeller, setIsSeller, navigate, axios} = useAppContext()
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setpassword] = useState("admin123")

    const onSubmitHandler = async(event) => {
        try {
            event.preventDefault();
            const {data} = await axios.post('/api/seller/login', {email, password})

            if (data.success) {
                setIsSeller(true)
                navigate('/seller')
                toast.success("Logged in")                
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            if (error.response?.status === 429) {
                toast.error(error.response.data.message || "Too many requests, try again later.");
            } else {
                toast.error(error.message);
            }
        }
    }

    useEffect(()=>{
        if (isSeller) {
            navigate('/seller', {replace: true})            
        }
    },[isSeller])

  return !isSeller && (
    <form onSubmit={onSubmitHandler} data-aos="fade-up" className='min-h-screen flex items-center text-sm text-gray-600'>

        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border
        border-gray-200'>
            <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='enter your email'
                className='border border-gray-200 rounded w-full outline-primary p-2 mt-1' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)} value={password} type='password' placeholder='enter your password'
                 className='border border-gray-200 rounded w-full outline-primary p-2 mt-1' required/>
            </div>
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">Login</button>
        </div>
      
    </form>
  )
}

export default SellerLogin
