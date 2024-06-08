import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from './App'

const ForgetPassword = () => {

  const {email,setEmail}=useContext(AppContext)
  const [status,setStatus]=useState('')
  
  const submitEmail=async (data)=>{
    try{
    const response=await axios.post(`${process.env.REACT_APP_URL}/users/forgetPassword`,email)
    console.log(response.data)
    setStatus(response.data.message)
  }catch(error){
    console.log(error)
  }
  }
  
  return (
    <div className='pt-32 flex justify-center  h-screen'>
    <p className='text-green-600 pt-3'>{status}</p>
        <div  className='rounded-lg bg-slate-100 shadow-slate-400 shadow-md border flex flex-col justify-center  border-border p-10 h-56'>
        <input type="text" placeholder='email@gmail.com' className='rounded-lg' onChange={(e)=>{
          console.log(e.target.value)
          setEmail(e.target.value)
        }}/>
        <input type="submit" value='Send Verification Link' className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  xs:w-full dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto   me-2 mt-7 w-full xs:text-center xs:text-nowrap overflow-hidden" onClick={submitEmail}/></div>
    </div>
  )
}

export default ForgetPassword