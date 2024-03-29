
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login, signup } from '../../lib/slices/auth';

export default function Signup() {
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [phone,setPhone] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
   const submit =async()=>{
    try {
      await dispatch(signup({
        first_name: firstname,
        last_name: lastname,
        phone_number:phone,
      
      })).unwrap()
    
      router.push('/auth/confirm')
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center gap-4 w-42 h-[400px] bg-purple-400 p-8 rounded-lg shadow-xl '>
      <input className="rounded-lg border-2 border-solid border-gray-300 p-2 focus:border-2 focus-visible:border-green-300 focus-visible:outline-none" placeholder='Username' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
      <input className="rounded-lg border-2 border-solid border-gray-300 p-2 focus:border-2 focus-visible:border-green-300 focus-visible:outline-none" placeholder='First name' value={firstname} onChange={(e)=>setFirstname(e.target.value)}></input>
      <input className="rounded-lg border-2 border-solid border-gray-300 p-2 focus:border-2 focus-visible:border-green-300 focus-visible:outline-none" placeholder='Last name' value={lastname} onChange={(e)=>setLastname(e.target.value)}></input>
       
       <button onClick={submit} className="rounded-full bg-purple-900 text-white text-bold p-2 my-4">submit   </button>
        
      </div>
    </div>
  )
}
