import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';

const Dashboard = () => {
    const {setUser,isLoading,setIsLoading,setMenu}=useContext(AppContext)
    let [course,setCourse]=useState([])
    const storedUser=JSON.parse(window.localStorage.getItem('user'))
    const userID=storedUser?._id
    let token= atob(window.localStorage.getItem('token'))
    useEffect(() => {
      setMenu('Dashboard')
        setUser(JSON.parse(window.localStorage.getItem('user')));
      }, [setUser]);
      useEffect(()=>{
        setIsLoading(true)
    },[setIsLoading])




useEffect(() => {
    const fetchCourses = async () => {
      try{
          const res = await axios.get(`${process.env.REACT_APP_URL}/api/dashboard/${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCourse(res.data.courses);
        setIsLoading(false);
      }catch(error){
      }
      }
  
    fetchCourses();
  }, []);
  
  return (
    <div >
        {storedUser?isLoading? (<div className='w-full  mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>):(<div className='flex'>
        <div className='bg-slate-800'></div>
        <div className='pt-24 bg-slate-100 h-screen' ><h1 className='text-white'> </h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        
        { 
           course?.map((course)=>{
            const date= course?.Released.slice(0,4)
            return(
                <Link to={`/course/${course?._id}`} className='flex flex-col pb-5 justify-between '><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-40 xs:w-96 rounded-lg ' loading='lazy'/>
                <p className='text-red-400 h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden ' key={Math.random()}>{course.Title}</p>
                <p className='text-red-300 text-sm' key={Math.random()}>Released: {date} </p>
                <p className='text-red-200 text-sm' key={Math.random()}>Rating: {course.Rating}</p>
                </div></Link>
                )
            })   
        }
        </div></div></div>):(<h1 className='text-slate-400 text-center'>You Haven't Logged In </h1>)}
    </div>
  )
}

export default Dashboard