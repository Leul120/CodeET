// import axios from 'axios'
import React from 'react'

const ForgetPassword = () => {
  // const submitEmail=async (data)=>{
  //   const response=await axios.post('http://localhost/users/forget-password',data)

  // }
  return (
    <div className='pt-32 flex justify-center bg-gradient-to-t from-slate-950 to-slate-100'>
        <form action="" className='rounded-lg bg-gradient-to-b from-slate-950 to-slate-100 shadow-slate-400 shadow-md border flex flex-col justify-center  border-border p-10'>
        <input type="text" placeholder='email@gmail.com' className='rounded-lg'/>
        <input type="submit" value='Send Verification Link' className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  xs:w-full dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto   me-2 mt-7 w-full xs:text-center xs:text-nowrap overflow-hidden"/></form>
    </div>
  )
}

export default ForgetPassword