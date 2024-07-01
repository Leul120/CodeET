import React, { useContext, useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import * as yup from 'yup'
import "./popular.css"
import { useForm,Controller } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { Button,message } from 'antd';
import axios from 'axios';
import { AppContext } from './App';
const ContactUs = () => {
    const [loading,setLoading]=useState(false)
    const {setMenu}=useContext(AppContext)
    const [email,setEmail]=useState("")
    const {register,handleSubmit,control,reset,formState: { errors }}=useForm()
    useEffect(()=>{
        setMenu("Contact-us")
    })
    const submitData=async (data)=>{
        
        console.log("hello")
        console.log(data)
        try{
            setLoading(true)
        await axios.post(`${process.env.REACT_APP_URL}/users/contact-us`,data)
    setLoading(false)
    message.success("sent")
}catch(err){
            console.log(err)
            message.error("error")
        }
    }

  return (<div className='flex flex-row'>
  <section className='logo w-1/2 min-h-screen flex items-center bg-slate-400 h-full bg-gradient-to-r from-slate-700 to-sky-900 '>
    <div className='text-7xl font-bold bg-gradient-to-r from-indigo-400 to-blue-800 text-transparent bg-clip-text -rotate-90 h-full w-full pl-24 '>CodeET</div>
  </section>
    <div className=' flex justify-center pt-16 w-full  bg-stone-100 min-h-screen h-full'>
    <div className=' p-10 rounded-xl '>
    <h1 className='font-bold text-sky-500 pb-20'>Contact Us</h1>
    <form onSubmit={handleSubmit(submitData)}>
    <div className='flex flex-row gap-3 pb-5'> 
    <Controller
    name='firstName'
    control={control}
    rules={{required:true}}
    render={({ field }) => (
                  <input className='w-full border-slate-400 bg-stone-100   border-b-2' allowClear placeholder='First Name' {...field}></input>
                )}
    />
    <Controller
    name='lastName'
    control={control}
    rules={{required:true}}
    render={({ field }) => (
                  <input className='w-full border-slate-400 bg-stone-100   border-b-2' allowClear placeholder='Last Name' {...field}></input>
                )}
    />
    </div>
    <Controller
    name='email'
    control={control}
    rules={{required:true}}
    render={({ field }) => (
                  <input className='w-full border-slate-400 bg-stone-100  mb-5 border-b-2' allowClear placeholder='Email' {...field}></input>
                )}
    />
    <Controller
    name='phoneNumber'
    control={control}
    rules={{required:true}}
    render={({ field }) => (
                  <input className='w-full border-slate-400 bg-stone-100  mb-5 border-b-2' allowClear placeholder='Phone Number' {...field}></input>
                )}
    />
    <Controller
    name='description'
    control={control}
    rules={{required:true}}
    render={({ field }) => (
                  <textArea placeholder='Description ' className='mt-4 h-44 border-slate-400 border-2 rounded-lg w-full bg-stone-100'{...field}/>
                )}
    />
    {loading && <button type='submit' disabled className="w-full h-9 mt-3 rounded-3xl p-1 text-white flex gap-2 text-sm items-center justify-center bg-purple-500"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>send</button>}
       {!loading && <button type='submit' className="w-full mt-3 h-9 rounded-3xl p-1 text-white flex items-center hover:bg-white hover:text-purple-700 hover:border justify-center bg-purple-700 text-sm" >Send</button> }
            {/* <Button type="primary" htmlType="submit">Send</Button> */}
            </form>
    </div>
    
    </div></div>
  )
}

export default ContactUs