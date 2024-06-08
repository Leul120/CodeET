import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from './App'
import { Input } from 'antd'
import { message } from 'antd'
const ResetPassword = () => {
    const emailToken=useParams().resetToken
    const {email}=useContext(AppContext)
    const [status,setStatus]=useState()
    const [password,setPassword]=useState("")
 const verify=async()=>{
    try{
    const response=await axios.get(`${process.env.REACT_APP_URL}/resetPassword/${emailToken}`)
    console.log(response.data)
    setStatus(response.data.status)
    }catch(error){
        console.log(error)
    }
 }
 useEffect(()=>{
    verify()
 },[])
 const updatePassword=async()=>{
    try{
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/updatePassword/${email}`,{
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
            <div>
            <Input  placeholder='your new password' onChange={(e)=>{
                console.log(e.target.value)
                setPassword(e.target.value)
            }}/>
            <Input  type='submit' onClick={updatePassword}  />
            </div>
        ):(<p>failed</p>)}
    </div>
  )
}

export default ResetPassword