import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Input } from 'antd'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
const ResetPassword = () => {
    const navigate=useNavigate()
    const emailToken=useParams().resetToken
    const [status,setStatus]=useState()
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
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
        setLoading(true)
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/updatePassword`,{
            email:email,
            password:password,
        })
        console.log(response.data)
        setLoading(false)
        message.success(response.data.message)
        navigate('/login')
    }catch(error){
        setLoading(false)
        console.log(error)
    }
 }

  return (
    <div>
        {status===200?(
            <div className='flex justify-center bg-stone-100 h-screen'>
            <div className='mt-44 w-96 flex flex-col bg-white rounded-3xl  justify-center gap-4 p-10 '>
            <Input  placeholder='your new password' className='rounded-md' onChange={(e)=>{
                console.log(e.target.value)
                setPassword(e.target.value)
            }}/>
            {!loading&&( <button  type='submit' value="Submit" onClick={updatePassword} className='bg-indigo-500 h-9 text-white hover:bg-white hover:text-indigo-500 text-serif text-sm rounded-3xl' >Reset</button>)}
            {loading&&(<button  type='submit' disabled value="Submit" onClick={updatePassword} className='bg-indigo-500 h-9 text-white flex flex-row justify-center items-center gap-2 rounded-3xl text-serif text-sm' ><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>Reseting</button>)}
            </div></div>
        ):(<p className='text-center'>Verification Failed</p>)}
    </div>
  )
}

export default ResetPassword