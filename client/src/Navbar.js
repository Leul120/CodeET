import React, { useContext, useEffect, useState} from 'react'
import { CiHeart, CiHome, CiSearch } from "react-icons/ci";
import { IoIosLogIn, IoIosMenu, IoMdContact } from "react-icons/io";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { Menu, Popconfirm ,Drawer} from 'antd';
import { AppContext } from './App';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  message } from 'antd';


const Navbar = () => {
  const {courses,setText,user,setUser,page,setPage,isLoading,setIsLoading,menu,setMenu}=useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [tx,setTx]=useState("")
  
  


  useEffect(()=>{
    setUser(JSON.parse(window.localStorage.getItem('user')))
    
  },[page])
 

  const fetcher=async ()=>{
    setIsLoading(true)
    setText(tx)
    setIsLoading(false)
}

const Logout=()=>{
  Cookies.remove('authorization')
  window.localStorage.removeItem('user')
  setUser(null)
  

  message.success('Logged out Successfully');
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
    console.log(e.key)
  }

  return (<>
    {!isLoading &&(<>
    <div className='bg-gradient-to-t fixed w-full from-slate-300 to-slate-700  shadow-emerald-300 z-50  flex justify-between  items-center h-16'>
      <ToastContainer theme='dark'/>
      <div className='flex justify-between absolute left-1 '>
      <p className='-rotate-90 pr-1 pt-0 bg-gradient-to-r from-blue-800 to-yellow-400 text-transparent bg-clip-text'>CodeEt</p>
      <div className='  top-3 sm:flex  border rounded-lg justify-between sm:justify-start - xs:w-auto  border-gradient-to-r from-blue-600 to-yellow-700 '>
      
      <input className='bg-transparent focus:ring-0 ring-black pl-2 sm:ml-2 text-slate-200  rounded-lg h-8  ml-5 ' list='course-list'  placeholder='Search Courses Here'  onChange={(e)=>{
        
        setTx(e.target.value.toLowerCase())
      }} /><button onClick={()=>{setPage(1)
        fetcher()}} className='pl-1  items-center flex float-right text-white text-2xl hover:text-xl '><CiSearch/></button>
      </div>
      </div>
      {/* <div className={count} >
      
      </div> */}
      
      <button  className='border-red bg-transparent border-0 hover:bg-slate-300 flex justify-center h-6 w-7 md:hidden  font-bold text-slate-200 rounded-2xl text-2xl text-center  mx-9 text ' onClick={showDrawer}>
      <IoIosMenu/>
      </button>
      <Drawer title="Menu" className='h-1/2 w-full' onClose={onClose} open={open}>
      <Menu defaultSelectedKeys={[menu]} onSelect={select} className='w-full bg-transparent flex-col   md:flex '>
      <Menu.Item className='focus:bg-white ' key="home"  icon={<CiHome/>}><Link className='text-white ' to='/'>Home</Link></Menu.Item>
      <Menu.Item key="Dashboard" icon={<RxDashboard/>}><Link to='/dashboard'>Dashboard</Link></Menu.Item>
      <Menu.Item key="contactus" icon={<IoMdContact/>}><Link>Contact Us</Link></Menu.Item>
      {!user && <Menu.Item key="login" icon={<IoIosLogIn/>}><Link to='/login'>Login</Link></Menu.Item>}
      {user && <Menu.SubMenu key='logout' icon={<RxAvatar/>} title={user.name}><Menu.Item><Popconfirm
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