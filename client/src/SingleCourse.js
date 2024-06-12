import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from './App';
import { useNavigate, useParams } from 'react-router-dom';
import './popular.css'
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'




const SingleCourse = () => {
  const { user, setUser,enrolled,setEnrolled,course,setCourse,isLoading,setIsLoading } = useContext(AppContext);
  const [error,setError]=useState(false)
  const [read,setRead]=useState(false)
  useEffect(() => {
    findUser()
    filter();
    
  }, []);
  useEffect(() => {
    
    setUser(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  const { courseID } = useParams();
  useEffect(()=>{
  if(user && user.courses.includes(courseID)){
    setEnrolled(true)
  }else if(user && !user.courses.includes(courseID)){
    setEnrolled(false)
  }},[user,setEnrolled])


  
  let token=window.localStorage.getItem('token')
   token=atob(token)
  
  const navigate=useNavigate()
  const filter = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/?_id=${courseID}`);
      if (response.data.courses) {
        setError(false)
        setIsLoading(false);
      }
      setCourse(response.data.courses[0]);
    } catch (error) {
      console.error(error);
      
      setIsLoading(false);
      setError(true)
    }
  };
 
  

  const userID=user?._id
  const findUser=async ()=>{
    try{
        
const response=await axios.get(`${process.env.REACT_APP_URL}/users/${userID}`)
setError(false)
window.localStorage.setItem('user',JSON.stringify(response.data.user))
    }catch(error){
        return(
          setError(true)
        )
    }
}
  return (
    <div>
      {!error&&(
    <div className='flex flex-row pt-10 items-center flex-wrap  pl-3 min-h-screen single'>
    

    
        {isLoading?(<div className='w-80 pt-16'><Skeleton className='h-80' baseColor='#2a2b2a' borderRadius='1rem' highlightColor='#4a4f4b'/></div>):(<div className='h-80 rounded-xl pt-16 inline'><img alt={course.Title} src={course.Poster} className=' rounded-lg h-full w-80  '/></div>)}
        
       {isLoading?(<div className='w-96 ml-4'><Skeleton className='h-8 mr-6 mb-4 flex justify-center' baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/>
       <div className='w-28 ml-5'><Skeleton className='h-10' baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/></div></div>):(<div className='pl-4 text-slate-200' ><h1 className='mb-4 flex justify-center bg-gradient-to-r from-blue-400 to-gray-100 text-transparent bg-clip-text' style={{whiteSpace:"pre-wrap"}}>{course.Title}</h1>
        
       <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={user?enrolled?()=>{navigate(`/course/watch/${courseID}`)}: ()=>{navigate(`/pay/${course._id}/${userID}`)}:()=>{navigate('/login')}}>
        {user? enrolled?"Go to Course" :"Enroll Now":"Login To Enroll"}
        </button></div>)}
        <div className={`text-wrap   flex flex-col pl-2  pr-2 overflow-hidden`}>
        {isLoading?(<><div className='w-44 ml-5'><Skeleton className='h-7' baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/></div><div className='w-56 ml-5'><Skeleton className='h-7' baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/></div></>):(<><h2 className='text-stone-300'>{course.DTitle}</h2>
        <div className='text-slate-400'>Year: {course.Year}</div>
        <div className='text-slate-400'>Language: {course.Language}</div></>)}<br/>
        
        <div className={`backdrop-blur-lg bg-white/30 rounded-3xl p-2 mr-2 ${!read?"h-56 bg-gradient-to-b from-stone-300 to-slate-500 text-transparent bg-clip-text":"h-full text-stone-300"}`}>
        {isLoading?(<div className='w-screen mr-3 '><Skeleton className='h-7' count={20} baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/></div>):(<>
        <div style={{whiteSpace:"pre-wrap"}} className=''> <br/>{course.Description}</div><br />
        <div style={{whiteSpace:"pre-wrap"}} className=''> <br />{course.Requirements}</div><br />
        <div style={{whiteSpace:"pre-wrap"}} className=''>{course.Learn}</div><br />
        <div style={{whiteSpace:"pre-wrap"}} className=''>{course.CourseFor}</div><br />
        <div style={{whiteSpace:"pre-wrap"}} className=''>{course.CourseGoal}</div><br /></>)}</div>
        </div>
        {isLoading?(<div className='w-32 ml-5 mt-2'><Skeleton className='h-7' baseColor='#2a2b2a' borderRadius='10px' highlightColor='#4a4f4b'/></div>):(<button className='pl-5 flex items-center p-1 rounded-lg text-stone-200' onClick={()=>{
          setRead(!read)
        }}>{!read?`Read More`:"Show Less"}</button>)}
    </div>)}
    {error && (<h1 className='pt-8'>Network Error</h1>)}
    </div>
  )}


export default SingleCourse