import React from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Home=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        const checkUser=async()=>{
            try{
                const res=await fetch('/api/users/welcome',{
                    method:'GET',
                    credentials:'include'
                })
                const data=await res.json();
                if(data.user){navigate(`/auth/users/${data.user.name}`)}
            }catch(error){
                console.log("User not logged in")
            }
        }
        checkUser();
    },[])

    return(
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex items-center justify-center h-100 gap-2'>
                <Link to="/auth?state=register"><button className='px-2 py-1 border-2 rounded bg-gray-100'>Get Started</button></Link>
                <Link to="/auth?state=login"><button className='px-2 py-1 border-2 rounded bg-gray-100 hover:bg-black hover:text-white'>Login</button></Link>
            </div>
        </div>
    )
}

export default Home