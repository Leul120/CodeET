import React, { useContext, useEffect, useState} from 'react'
import { CiHome, CiSearch } from "react-icons/ci";
import { IoIosLogIn, IoIosMenu, IoMdContact } from "react-icons/io";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { Menu, Popconfirm ,Drawer,Input} from 'antd';
import { AppContext } from './App';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  message } from 'antd';
import axios from 'axios';


const Navbar = () => {
  const {courses,setText,user,setUser,setPage,isLoading,setIsLoading,menu,setMenu}=useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [tx,setTx]=useState("")
  const [errored,setErrored]=useState(false)
  
  


  useEffect(()=>{
    setUser(JSON.parse(window.localStorage.getItem('user')))
    
  },[])
 
console.log(user)
  const fetcher=async ()=>{
    setIsLoading(true)
    setText(tx)
    setIsLoading(false)
}

const Logout=async ()=>{
  try{
  await axios.get(`${process.env.REACT_APP_URL}/users/logout/${user._id}`)
  Cookies.remove('authorization')
  window.localStorage.removeItem('user')
  setUser(null)
  message.success('Logged out Successfully');
  }catch(error){
    console.log(error)
    setErrored(true)
  }
}
const cancel = (e) => {
  message.error('Cancelled Log Out');
};

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const select=(e)=>{
    setMenu(e.key)

  }

  return (<>
 
    {!isLoading && !errored &&(<>
    <div className='bg-white fixed w-full   shadow-emerald-300 z-50  flex justify-between  items-center h-16'>
      <ToastContainer theme='dark'/>
      <div className='flex justify-between absolute left-1 '>
      <p className='-rotate-90 pr-1 pt-0 bg-gradient-to-r from-blue-800 to-yellow-400 text-transparent bg-clip-text'>CodeET</p>
     
      <Input className='bg-transparent focus:ring-0 ring-black pl-2 text-slate-700 sm:ml-2  rounded-lg h-8 w-32 xs:w-40 sm:w-auto ml-5 ' list='course-list'  placeholder='Search Courses Here' onChange={(e)=>{
        console.log(e)
        setTx(e.target.value.toLowerCase())
      }} onKeyDown={(e)=>{
        console.log(e.key)
        if(e.key==="Enter"){
          setPage(1)
        fetcher()
        }
      }}/><button onClick={()=>{}} className='pl-1  items-center flex float-right text-white text-2xl hover:text-xl '><CiSearch/></button>
      
      </div>
      {/* <div className={count} >
      
      </div> */}
      
      <button  className='border-red bg-transparent border-0 hover:bg-slate-300 flex justify-center h-6 w-7 md:hidden  font-bold text-slate-200 rounded-2xl text-2xl text-center  mx-9 text ' onClick={showDrawer}>
      <IoIosMenu/>
      </button>
      <Drawer title="Menu" className='h-1/2 w-40' onSelect={()=>{
      }} onClose={onClose} open={open}>
      <Menu defaultSelectedKeys={[menu]} onSelect={select} className='w-40 bg-transparent flex-col   md:flex '>
      <Menu.Item className='focus:bg-white ' key="home"  icon={<CiHome/>}><Link className='text-white ' to='/'>Home</Link></Menu.Item>
      <Menu.Item key="Dashboard" icon={<RxDashboard/>}><Link to='/dashboard'>Dashboard</Link></Menu.Item>
      <Menu.Item key="contactus" icon={<IoMdContact/>}><Link>Contact Us</Link></Menu.Item>
      {!user && <Menu.Item key="login" icon={<IoIosLogIn/>}><Link to='/login'>Login</Link></Menu.Item>}
      {user && <Menu.SubMenu key='logout'  icon={<RxAvatar/>} title={user.name}><Menu.Item mode="inline"><Popconfirm
    title="Log Out"
    description="Are you sure to Log Out?"
    onConfirm={Logout}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  ><button className='m-0 h-full w-full'>Log Out</button></Popconfirm></Menu.Item></Menu.SubMenu>}
     </Menu>
      </Drawer>

      <datalist className='bg-white text-border h-48 overflow-hidden' id='course-list'>
        {courses.map((course,index)=>{
          
          
          return(
            <option className='bg-white text-border' key={index} value={course.Title}></option>
          )

        })
         
      }
      </datalist>
     <Menu mode='horizontal' defaultSelectedKeys={[menu]} onSelect={select} className='w-1/2 bg-transparent h-12 hidden md:flex justify-start items-center overflow-x-auto '>
      <Menu.Item className='focus:bg-white ' key="home"  icon={<CiHome/>}><Link className='text-white ' to='/'>Home</Link></Menu.Item>
      <Menu.Item key="Dashboard" icon={<RxDashboard/>}><Link to='/dashboard'>Dashboard</Link></Menu.Item>
      <Menu.Item key="contactus" icon={<IoMdContact/>}><Link>Contact Us</Link></Menu.Item>
      {!user && <Menu.Item key="login" icon={<IoIosLogIn/>}><Link to='/login'>Login</Link></Menu.Item>}
      {user && <Menu.SubMenu key='logout' icon={<RxAvatar/>} title={user.name}><Menu.Item ><Popconfirm
    title="Log Out"
    description="Are you sure to Log Out?"
    onConfirm={Logout}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  ><button className='w-full h-full ring-0  hover:ring-0'>Log Out</button></Popconfirm></Menu.Item></Menu.SubMenu>}
     </Menu>


      
    </div>
    </>)}
    </>
  )
}

export default Navbar