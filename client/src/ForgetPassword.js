import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from './App'
import { Input,notification } from 'antd'

const ForgetPassword = () => {

  const {email,setEmail}=useContext(AppContext)
  const [status,setStatus]=useState('')
  const [api, contextHolder] = notification.useNotification();
  const submitEmail=async ()=>{
    window.localStorage.setItem('resetEmail',email)
    console.log(email)
    try{
    const response=await axios.post(`${process.env.REACT_APP_URL}/users/forgetPassword`,{email:email})
    console.log(response.data)
    setStatus(response.data.message)
    api.open({
      message: 'Notification Title',
      description:
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
    });
    
  }catch(error){
    console.log(error)
  }
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    {contextHolder}
        <div  className='rounded-lg bg-slate-100 w-1/2 shadow-slate-400 shadow-md border flex flex-col justify-center  border-border p-10 h-56'>
        <Input type="text" placeholder='email@gmail.com' className='rounded-lg mb-3'onChange={(e)=>{
          console.log(e.target.value)
          setEmail(e.target.value)
        }}/>
        <Input type="submit" value='Send Verification Link'  onClick={submitEmail}/></div>
    </div>
  )
}

export default ForgetPassword