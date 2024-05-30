import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './App'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchCourses } from './Home'
import Description from './Description'
import Footer from './Footer'
import Pagination from '@mui/material/Pagination';
import {LoadingOutlined} from '@ant-design/icons'
import { Menu } from 'antd'

import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'


const PopularCourses = () => {
    const {courses,text,setCourses,page,setPage,isLoading,setIsLoading,setRefetcher,sort,setSort,setUser,setMenu}=useContext(AppContext)
    // const [user,setUser]=useState({})
   
   useEffect(() => {
    setMenu('home')
     setUser(JSON.parse(window.localStorage.getItem('user')));
    setIsLoading(true)
 
  fetchCourses(page, text,sort).then((fetchedCourses) => {
    if(fetchedCourses){
    setCourses(fetchedCourses)
    setIsLoading(false)
}
  }).catch((err)=>{
    console.log(err)
  })
}, [text,page,sort]);
    
    
   
    
    const onChange=(e)=>{
      setSort(e.key)
      setPage(1)
    }
    
console.log(process.env.REACT_APP_URL)
  return (
    <>
    {isLoading?(<div role="status" className='flex justify-center items-center mt-56 text-3xl bg-transparent'>
        <LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:80}}/>
    </div>):(
        <div className='flex  '>
        <div className='flex flex-col fixed w-16 sm:w-24 text-black h-full bg-transparent'>
         
          
          <Menu onChange={onChange} value={sort} onSelect={onChange} className='text-white bg-transparent '>
         
          <Menu.SubMenu key="odd" title="sort" className='text-black  mt-10 border border-red-300 shadow-md shadow-red-500  '>
            <Menu.SubMenu  title="Released">
            <Menu.Item key="Released" className='text-2xl w-6 text-center'><IoIosArrowRoundUp/></Menu.Item>
            <Menu.Item key='-Released' className='text-2xl w-6 text-center' ><IoIosArrowRoundDown /></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Price">
              <Menu.Item key='Price'  className='text-2xl w-6 text-center'><IoIosArrowRoundUp/></Menu.Item>
            <Menu.Item key="-Price"  className='text-2xl w-6 text-center'><IoIosArrowRoundDown /></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Rating">
              <Menu.Item key='Rating'  className='text-2xl w-6 text-center'><IoIosArrowRoundUp/></Menu.Item>
            <Menu.Item key='-Rating'  className='text-2xl w-6 text-center'><IoIosArrowRoundDown /></Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
       
        </Menu>

          
        </div>
        <section className='pl-16 sm:pl-24 bg-gradient-to-t from-slate-700 to-slate-100'>
    <Description/>
   
    <div className='xs:grid gap-5 flex flex-row flex-wrap xs:grid-cols-3  sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 p-4 '>
        {courses?.map((course,index)=>{
            const date= course?.Released.slice(0,4)
            return(
                // <div className='p-1 mt-1 w-44 h-48 xs:h-64 xs:w-auto border-spacing-1 border border-border rounded-lg bg-slate-800 shadow-md shadow-slate-600 flex justify-center object-fill'>
                <Link to={`/course/${course._id}`} className='flex flex-col pb-5 justify-between w-28 sm:w-auto '><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-28 xs:w-96 rounded-lg' loading='lazy'/>
                <p className=' h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden w-32 xs:w-full bg-gradient-to-r from-green-600 to-purple-600 text-transparent bg-clip-text' key={Math.random()}>{course.Title}</p>
                <p className='text-red-300 text-sm bg-gradient-to-r from-stone-200 to-orange-400 text-transparent bg-clip-text' key={Math.random()}>Released: {date}</p>
                <p className='text-red-200 text-sm' key={Math.random()}>Rating: {course.Rating}</p>
                <p className='text-red-300 text-sm bg-gradient-to-r from-stone-200 to-orange-400 text-transparent bg-clip-text' key={Math.random()}>{course.bought} {" "} people bought</p>
                </div>
                <button type="button" className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 w-28 xs:w-full dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto   me-2 pt-1  xs:text-center xs:text-nowrap overflow-hidden max-w-96"> {course.Price-0.01}Birrs only</button>

                
                </Link>
                // </div>
            )
        })}</div>
    
        <Pagination count={4}  color='primary' page={page} shape="rounded" className='m-3  p-0  rounded-lg bg-gradient-to-r from-gray-300 to-slate-950 flex justify-center' onChange={async (e,i)=>{
           await setPage(i)
           setRefetcher(true)
           
            }} />
        
    <Footer/>
    </section>
    </div>
    )}
    </>
  )
}

export default PopularCourses