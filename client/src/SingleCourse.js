import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from './App';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { LoadingOutlined } from '@ant-design/icons';
import { FaAngleDown, FaArrowDown, FaArrowDownWideShort } from 'react-icons/fa6';



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
window.localStorage.setItem('user',JSON.stringify(response.data.user))
    }catch(error){
        return(
          <h1>Network Error</h1>
        )
    }
}
  return (
    <div>
      {isLoading? (<div className='w-full h-1/2 mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>):(
    <div className='flex flex-row pt-10 items-center flex-wrap bg-slate-100 pl-3 min-h-screen'>
    

    
        <img alt={course.Title} src={course.Poster} className='h-96 rounded-lg  w-80 pt-16 '/>
        <div className='pl-4 text-slate-200' >
        <h1 className='mb-4 flex justify-center bg-gradient-to-r from-blue-600 to-gray-500 text-transparent bg-clip-text' style={{whiteSpace:"pre-wrap"}}>{course.Title}</h1>
        
       <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={user?enrolled?()=>{navigate(`/course/watch/${courseID}`)}: ()=>{navigate(`/pay/${course._id}/${userID}`)}:()=>{navigate('/login')}}>
        {user? enrolled?"Go to Course" :"Enroll Now":"Login To Enroll"}
        </button></div>
        <div className={`text-wrap   flex flex-col pl-2  pr-2 overflow-hidden`}>
        <h2 className='t'>{course.DTitle}</h2>
        <div>Year: {course.Year}</div>
        <div>Language: {course.Language}</div><br/>
        <div className={` p-2 ${!read?"h-56 bg-gradient-to-b from-black to-slate-300 text-transparent bg-clip-text":"h-full"}`}>
        <div style={{whiteSpace:"pre-wrap"}}> <br/>{course.Description}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}> <br />{course.Requirements}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.Learn}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.CourseFor}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.CourseGoal}</div><br /></div>
        </div>
        <button className='pl-5 flex items-center p-1 rounded-lg' onClick={()=>{
          setRead(!read)
        }}>{!read?`Read More`:"Show Less"}</button>
    </div>)}
    </div>
  )}


export default SingleCourse