import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Login = () => {
  const [urlparam]=useSearchParams();
  const urlState=urlparam.get('state');
  const navigate=useNavigate();

  const [state, setState]=useState(urlState || "login")
  const [formData, setFormData]=useState({
    name:'',
    email:'',
    password:''
  })

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await fetch(`/api/users/${state}`,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      toast.success(data.message)
      navigate(`/auth/users/${data.user.name}`)
    }catch(error){
      // toast(error.message)
      toast(error?.response?.data?.message || error.message);
    }
  }


  const handleChange=async(e)=>{
    const {name, value}=e.target;
    setFormData(prev=>({...prev,[name]:value}))
  }

  useEffect(()=>{
    setState(urlState || "login")
  },[urlState])

  return (
    <div className='flex items-center justify-center min-h-screen'>
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {state==="login"?"Login":"Sign Up"}
              </h2>
      
            {state==="register" && <input name="name" value={formData.name} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" required />}     
            <input name='email' value={formData.email} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" required />
            <input name='password' value={formData.password} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" required />
        
            <button type='submit' className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">{state==="login"?"Login":"Create Account"}</button>
            
            <p className="text-center mt-4">{state==="login"?"Don't have account?":"Already have account?"} <Link to={`/auth?state=${state==="login"?"register":"login"}`}>{state==="login"?"Sign Up":"Login"}</Link> </p>
        </form>
    </div>
  )
}

export default Login