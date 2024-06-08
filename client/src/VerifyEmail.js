import { message } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
const VerifyEmail = () => {
  const navigate=useNavigate()
    const users=JSON.parse(window.localStorage.getItem("users"))
    const token=useParams().token
    console.log(users)
    useEffect(()=>{
        const verifier=async ()=>{
        try{
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/verifyEmail/${token}`,users)
        console.log(response.data)
        const custom=btoa(response.data.token)
         window.localStorage.setItem('token',custom)
         window.localStorage.setItem('user',JSON.stringify(response.data.newUser))
        message.success("Email verified successfully!")
        navigate('/')
        }catch(error){
          console.log(error)
            message.error("error occured!")
        }}
        verifier()
    },[])

  return (
    <div>
      <div className='w-full  mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>
    </div>
  )
}

export default VerifyEmail