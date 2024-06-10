import React, { useContext, useEffect } from 'react'
import { AppContext } from './App'
import { Link } from 'react-router-dom'
import './popular.css'
import { fetchCourses } from './Home'
import Description from './Description'
import Footer from './Footer'
import Pagination from '@mui/material/Pagination';
import {LoadingOutlined} from '@ant-design/icons'
import { Menu, Rate } from 'antd'

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
  })
}, [text,page,sort]);
    
    
   console.log(courses)
    
    const onChange=(e)=>{
      setSort(e.key)
      setPage(1)
    }
  return (
    <>
    {isLoading?(<div role="status" className='flex justify-center items-center text-3xl bg-white h-screen'>
        <LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:80}}/>
    </div>):(
        <div className='flex main flex-col' >
        
         <Description/>
          
          <Menu onChange={onChange} value={sort}  onSelect={onChange} className='text-white bg-transparent border-none shadow-none w-24'>
         
          <Menu.SubMenu key="odd" title="sort" className='text-white bg-white/20 backdrop-blur-xl w-24 mt-1 ml-4 itemIcon={<DownOutlined />} ' style={{color:"white"}}>
            <Menu.SubMenu  title="Released">
            <Menu.Item key="Released" className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
            <Menu.Item key='-Released' className='' ><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Price">
              <Menu.Item key='Price'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
            <Menu.Item key="-Price"  className=''><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Rating">
              <Menu.Item key='Rating'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
            <Menu.Item key='-Rating'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
       
        </Menu>
       
       
    
   
    <div className='xs:grid gap-9 xs:gap-5 flex flex-row flex-wrap xs:grid-cols-3  sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 p-4  '>
        {courses?.map((course,index)=>{
            return(
                <Link to={`/course/${course._id}`} className='flex flex-col pb-5 justify-between w-28 xs:w-auto '><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-28 xs:w-96 rounded-lg' loading='lazy'/>
                <p className=' h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden w-32 xs:w-full text-slate-300 font-bold' key={Math.random()}>{course.Title}</p>
                
                <p className='text-red-400 text-sm ' key={Math.random()}><Rate disabled allowHalf defaultValue={course.Rating/2} /> {course.Rating}</p>
                <p className='text-red-300 text-sm bg-gradient-to-r from-green-200 to-purple-300 text-transparent bg-clip-text' key={Math.random()}>{course.bought} {" "} people bought</p>
                </div>
                <button type="button" className="text-white   bg-purple-500 flex items-center justify-center text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto   me-2  xs:text-center xs:text-nowrap overflow-hidden max-w-96"> {course.Price-0.01}Birrs only</button>

                
                </Link>
                // </div>
            )
        })}</div>
    <div className='flex justify-center'>
        <Pagination count={5}  color='secondary'  page={page} shape="rounded" className='m-3 w-72 p-0 text-white rounded-lg bg-white/30 flex justify-center backdrop-blur-2xl' onChange={async (e,i)=>{
           await setPage(i)
           setRefetcher(true)
           
            }} />
        </div>
    <Footer/>
    </div>
    )}
    </>
  )
}

export default PopularCourses