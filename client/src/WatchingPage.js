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
  const {enrolled,user}=useContext(AppContext)
    const {courseID}=useParams()
    const [course,setCourse]=useState({})
    const navigate=useNavigate()
    const videoRef = useRef(null);
   
    let token=atob(window.localStorage.getItem('token'))
    useEffect(()=>{
      if(!user || !enrolled){
        navigate('/')
      }
    })
    
    const filter=async ()=>{
      
      const response=await axios.get(`${process.env.REACT_APP_URL}/api/${courseID}`,{withCredentials: true,
        headers:{
          Authorization:`Bearer ${token}`
        }}
      )
      return response.data.courses
    }
        const {data,error,isFetched}=useQuery("singleCourse",filter)
        useEffect(()=>{
          if(data){
          setCourse(data)}},[setCourse,data])

        
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
          const handleScroll = () => {
            if (videoRef.current) {
              const rect = videoRef.current.getBoundingClientRect();
              const isInViewport =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);
              setIsVisible(isInViewport);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
           
             if(error?.request.status===401 || error?.request.status===500 ){
              navigate('/login')
              return(
              <>
                <h1 className='text-red-400 text-center'>{error.response.data.message} </h1>
                
              </>
            )
            }
            else if(error?.code==='ERR_NETWORK'){
              return(
              <h1 className='text-red-500 text-center pt-5'>Internal Server Error</h1>)
            }
              else if(isFetched){
  return (
    <div className=' pt-16 flex justify-center min-h-screen bg-gradient-to-t from-slate-950 to-slate-100' >
        
        <div className='w-full video'>
        <video
      ref={videoRef}
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
}
export default WatchingPage
