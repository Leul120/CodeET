import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from './App'
import { Input } from 'antd'
import { message } from 'antd'
const ResetPassword = () => {
    const emailToken=useParams().resetToken
    const [status,setStatus]=useState()
    const [password,setPassword]=useState("")

    const email=window.localStorage.getItem("resetEmail")
    console.log(email)
 const verify=async()=>{
    try{
    const response=await axios.get(`${process.env.REACT_APP_URL}/users/resetPassword/${emailToken}`)
    console.log(response.data)
    setStatus(response.data.status)
    }catch(error){
        console.log(error)
        message.error("error occured")
    }
 }
 useEffect(()=>{
    verify()
 },[])
 const updatePassword=async()=>{
    try{
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/updatePassword`,{
            email:email,
            password:password,
        })
        console.log(response.data)
        message.success(response.data.message)
    }catch(error){
        console.log(error)
    }
 }

  return (
    <div>
        {status===200?(
            <div className='flex justify-center'>
            <div className='mt-44 w-96 flex flex-col justify-center gap-4 '>
            <Input  placeholder='your new password' className='rounded-md' onChange={(e)=>{
                console.log(e.target.value)
                setPassword(e.target.value)
            }}/>
            <Input  type='submit' value="Submit" onClick={updatePassword}  />
            </div></div>
        ):(<p className='text-center'>failed</p>)}
    </div>
  )
}

export default ResetPassword