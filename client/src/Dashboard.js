import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';

const Dashboard = () => {
    // const [courseID,setCourseID]=useState([])
    const {user,setUser,isLoading,setIsLoading}=useContext(AppContext)
    let [course,setCourse]=useState([])
    
    
    let coursed=[]
    const storedUser=JSON.parse(window.localStorage.getItem('user'))
    const userID=storedUser?._id
    console.log(userID)
    let token= atob(window.localStorage.getItem('token'))
    console.log(token)
    const courseID=storedUser?.courses
    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));
      }, [setUser]);
      console.log(storedUser)
      console.log(user)
      useEffect(()=>{
        setIsLoading(true)
    },[setIsLoading])

            const hasRun = useRef(false);



useEffect(() => {
    const fetchCourses = async () => {
      if (!hasRun.current) {
        hasRun.current = true;
        const promises = courseID?.map(async (courseId) => {
          const res = await axios.get(`${process.env.REACT_URL}/api/${courseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data.course);
          return res?.data.course;
        });
        let allCourses;
        if(promises){
            allCourses= await Promise.all(promises);}
        setCourse(allCourses);
        setIsLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
    // }catch(error){
    //     console.log(error)
    // }}

    
    // console.log(course.length)
    console.log("hello")
  return (
    <div >
        {storedUser?isLoading? (<div className='w-full  mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>):(<div className='pt-24 bg-gradient-to-t from-slate-950 to-slate-100 h-screen' ><h1 className='text-white'>Here are the courses you bought </h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        
        { 
           course?.map((course)=>{
            return(
                <Link to={`/course/${course?._id}`} className='flex flex-col pb-5 justify-between '><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-40 xs:w-96 rounded-lg ' loading='lazy'/>
                <p className='text-red-400 h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden ' key={Math.random()}>{course.Title}</p>
                <p className='text-red-300 text-sm' key={Math.random()}>Released: </p>
                <p className='text-red-200 text-sm' key={Math.random()}>Rating: {course.Rating}</p>
                </div></Link>
                )
            })   
        }
        </div></div>):(<h1 className='text-slate-400 text-center'>You Haven't Logged In </h1>)}
    </div>
  )
}

export default Dashboard