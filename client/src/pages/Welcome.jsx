import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Welcome=()=>{
    const {name}=useParams();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);

    const logout=async()=>{
        try{
            const res=await fetch('/api/users/logout',{
                method:"POST",
                credentials:'include'
            })

            const data=await res.json();
            toast.success(data.message);
            navigate('/auth?state=login');
        }catch(error){
            toast.error(error.message)
        }
        
    }

    useEffect(()=>{
        const checkAuth=async()=>{
            const res=await fetch('/api/users/welcome',{
                method:'GET',
                credentials:'include'
            })

            if(!res.ok){
                navigate('/auth?state=login');
                return;
            }

            setLoading(false);
        }
        checkAuth();
    },[])

    if(loading){
        return(
            <>
            <p>Loading..................</p>
            </>
        )
    }

    return(
        <>
        <h1>Welcome {name}</h1><br/>
        <button className='p-2' onClick={logout}>Logout</button>
        </>
    )
}

export default Welcome;