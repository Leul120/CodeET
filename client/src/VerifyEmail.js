import { Input, message,notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
const VerifyEmail = () => {
  const navigate=useNavigate()
    const newID=useParams().newID
    const [loading,setLoading]=useState(false)
    const [api, contextHolder] = notification.useNotification();
    const lll= ()=>{
      
     api.open({
      message: 'Email sent',
      description:`Please check your email to verify and please check the spams folder in your email if you don't find it in your inbox`,
      duration: 0,
    });
    }
    // useEffect(()=>{
    //   lll()
    // },[])
  
     
    const [verificationCode,setVerificationCode]=useState("")
  
        const verifier=async ()=>{
        try{
          setLoading(true)
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/verifyEmail/${newID}`,{verificationCode:verificationCode})
        console.log(response.data)
        setLoading(false)
        const custom=btoa(response.data.token)
         window.localStorage.setItem('token',custom)
         window.localStorage.setItem('user',JSON.stringify(response.data.user))
        message.success("Email verified successfully!")
        navigate('/')
        }catch(error){
          setLoading(false)
          console.log(error)
            
            api.open({
      message: 'error',
      description:`The Verification page has expired. Please try signing up again.`,
      duration: 0,
    });
        }}
       

  return (
    <div className='flex h-screen justify-center flex-col items-center bg-stone-100'>
    {contextHolder}
    <div className='flex flex-col bg-white p-10 justify-center rounded-3xl shadow-lg '>
    <h1 className='text-serif font-bold text-sky-500 pb-5'>Verify email</h1>
      <Input variant='borderLess' placeholder='Your verification code'  className='w-48 ml-3  border-0 underline decoration-indigo-500 underline-offset-2 focus:underline-offset-6' onChange={(e)=>{
        setVerificationCode(e.target.value)
      }}/>
      {!loading &&(<button type='submit' value='Submit' className='w-32 mt-3 ml-9 bg-indigo-500 text-serif text-white rounded-3xl h-9 text-sm' onClick={verifier}>Submit</button>)}
      {loading &&(<button type='submit' value='Submit' className='w-32 mt-3 ml-9 bg-indigo-500 text-serif text-white rounded-3xl h-9 text-sm flex flex-row justify-center items-center gap-2 ' onClick={verifier}><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>Verifying</button>)}
      </div>
    </div>
  )
}

export default VerifyEmail