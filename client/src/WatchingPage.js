import React, { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import 'react-html5video/dist/styles.css'
// import introVideo from './2a6700dc41e61f6f53bb8cfd2c269188.mp4'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { AppContext } from './App'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'


const WatchingPage = () => {
  const [data,setData]=useState({})
  const navigate=useNavigate()
  const {user,enrolled}=useContext(AppContext)
  if(!user || !enrolled){
    navigate('/')
  }
  const courseID="FURNITURE"
  const find=async ()=>{
    try{
    const response=await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`)
      setData(response.data)
    }catch(error){
      console.log(error)
    }
  }

  const mapper=()=>{
    data.map((coursed,index)=>{
      const course=coursed.key.split('/')
      console.log(course[1])
      return(
        <div>{course[1]}</div>
      )
    })
  }
useEffect(()=>{
  find()
  mapper()
},[])
  return (
    <div className=' pt-16 flex justify-center min-h-screen bg-gradient-to-t from-slate-950 to-slate-100' >
        
        <div className='w-full video'>
        <video
      
      controls
      disablePictureInPicture
      disableRemotePlayback
      autoPlay
      className={`${isVisible ? '' : 'blurred'}`}
      style={{
        width: '100%',
        maxWidth: '800px',
        height: 'auto',
      }}
    >
      <source src="https://res.cloudinary.com/dbzebdg6r/video/upload/v1716303701/1._Course_Structure_and_Projects_jzwbyd.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        </div>
        <h1 className='text-blue-600 text-2xl mt-32'>{course.Title}</h1>
    </div>
  )
}
export default WatchingPage
