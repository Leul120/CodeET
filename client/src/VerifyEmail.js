import { Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
const VerifyEmail = () => {
  const navigate=useNavigate()
    const newID=useParams().newID
    const [verificationCode,setVerificationCode]=useState("")
  
        const verifier=async ()=>{
        try{
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/verifyEmail/${newID}`,{verificationCode:verificationCode})
        console.log(response.data)
        const custom=btoa(response.data.token)
         window.localStorage.setItem('token',custom)
         window.localStorage.setItem('user',JSON.stringify(response.data.user))
        message.success("Email verified successfully!")
        navigate('/')
        }catch(error){
          console.log(error)
            message.error("error occured!")
        }}
       

  return (
    <div className='flex h-screen justify-center flex-col items-center bg-slate-200'>
      <Input placeholder='Your verification code' className='w-44 my-3' onChange={(e)=>{
        setVerificationCode(e.target.value)
      }}/>
      <Input type='submit' value='Submit' className='w-32' onClick={verifier}/>
    </div>
  )
}

export default VerifyEmail