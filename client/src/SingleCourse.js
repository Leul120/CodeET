import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { LoadingOutlined } from '@ant-design/icons';



const SingleCourse = () => {
  const { user, setUser,enrolled,setEnrolled,course,setCourse,isLoading,setIsLoading } = useContext(AppContext);

  const { courseID } = useParams();

  useEffect(() => {
    findUser()
    filter();
    
  }, []);
  let token=window.localStorage.getItem('token')
   token=atob(token)
  useEffect(() => {
    
    setUser(JSON.parse(window.localStorage.getItem('user')));
  }, []);
  const navigate=useNavigate()
  console.log(token)
  const filter = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.URL}/api/course/?_id=${courseID}`);
      if (response.data.courses) {
        console.log(response.data.courses);
        setIsLoading(false);
      }
      setCourse(response.data.courses[0]);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  console.log(user)
 
  useEffect(()=>{
  if(user && user.courses.includes(courseID)){
    console.log("true")
    setEnrolled(true)
  }else if(user && !user.courses.includes(courseID)){
    console.log("false")
    setEnrolled(false)
  }},[user,setEnrolled])

  const userID=user?._id
  console.log(userID)
  console.log(user?.courses)
  const findUser=async ()=>{
    try{
        
const response=await axios.get(`${process.env.URL}/users/${userID}`)
console.log(response.data.user)
window.localStorage.setItem('user',JSON.stringify(response.data.user))
    }catch(error){
        console.log(error)
    }
}
  return (
    <div>
      {isLoading? (<div className='w-full h-1/2 mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>):(
    <div className='flex flex-row pt-10 items-center flex-wrap bg-gradient-to-t from-slate-950 to-slate-300  min-h-screen'>
        <img alt={course.Title} src={course.Poster} className='h-96 w-80 pt-16 '/>
        <div className='pl-4 text-slate-200' >
        <h1 className='mb-4 flex justify-center ' style={{whiteSpace:"pre-wrap"}}>{course.Title}</h1>

       <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={user?enrolled?()=>{navigate(`/course/watch/${courseID}`)}: ()=>{navigate(`/pay/${course._id}/${userID}`)}:()=>{navigate('/login')}}>
        {user? enrolled?"Go to Course" :"Enroll Now":"Login To Enroll"}
        </button></div>
        <div className='text-wrap text-slate-200  flex flex-col pl-2'>
        <h2>{course.DTitle}</h2>
        <div>Year: {course.Year}</div>
        <div>Language: {course.Language}</div><br/>
        <div style={{whiteSpace:"pre-wrap"}}>Description: <br/>{course.Description}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>Requirements: <br />{course.Requirements}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.Learn}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.CourseFor}</div><br />
        <div style={{whiteSpace:"pre-wrap"}}>{course.CourseGoal}</div><br />
        </div>
    </div>)}
    </div>
  )}


export default SingleCourse