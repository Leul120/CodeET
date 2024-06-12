import React, { useContext, useEffect, useState} from 'react'
import { CiHome, CiSearch } from "react-icons/ci";
import { IoIosLogIn, IoIosMenu, IoMdContact, IoMdLogOut } from "react-icons/io";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { Menu, Popconfirm ,Drawer,Input, Dropdown, Button} from 'antd';
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
 
    {!errored &&(<>
    <div className={`  fixed w-full   shadow-emerald-300 z-50  flex justify-between  items-center h-16 `}>
      <ToastContainer theme='dark'/>
      <div className='flex justify-between absolute left-1 '>
      <p className='-rotate-90 pr-1 pt-0 bg-gradient-to-r from-blue-800 to-yellow-400 text-transparent bg-clip-text'>CodeET</p>
     
      <Input className='bg-transparent focus:ring-0  ring-black border-white pl-2 text-black sm:ml-2  rounded-lg h-8 w-32 xs:w-40 lg:w-96 ml-5 focus:bg-transparent' allowClear   placeholder='Search Courses Here' onChange={(e)=>{
        console.log(e)
        setTx(e.target.value.toLowerCase())
      }} onKeyDown={(e)=>{
        console.log(e.key)
        if(e.key==="Enter"){
          setPage(1)
        fetcher()
        }
      }}/><button onClick={()=>{}} className='pl-1  items-center flex float-right text-sky-600 text-2xl hover:text-xl '><CiSearch/></button>
      
      </div>
      {/* <div className={count} >
      
      </div> */}
      
      <button  className='border-red  text-stone-800 border-0 hover:bg-slate-300 flex justify-center h-8 w-8 lg:hidden  font-bold rounded-2xl text-2xl text-center items-center  mx-9 backdrop-blur-xl bg-white/30 text ' onClick={showDrawer}>
      <IoIosMenu/>
      </button>
      <Drawer title="Menu" theme='dark' style={{backgroundColor:"black"}} className='h-1/2 bg-stone-700 w-40' onSelect={()=>{
      }} onClose={onClose} open={open}>
      <Menu theme='dark' defaultSelectedKeys={[menu]} itemColor="black" onSelect={select} className='w-40 bg-transparent flex-col   md:flex '>
      <Menu.Item className=' ' key="home"  icon={<CiHome/>}><Link className=' ' to='/'>Home</Link></Menu.Item>
      <Menu.Item key="Dashboard" icon={<RxDashboard/>}><Link to='/dashboard'>Dashboard</Link></Menu.Item>
      <Menu.Item key="contactus" icon={<IoMdContact/>}><Link>Contact Us</Link></Menu.Item>
      {!user && <Menu.Item key="login" icon={<IoIosLogIn/>}><Link to='/login'>Login</Link></Menu.Item>}
      {user && <Menu.SubMenu key='logout'  icon={<RxAvatar/>} className='capitalize' title={user.name}><Menu.Item mode="inline"><Popconfirm
    title="Log Out"
    description="Are you sure to Log Out?"
    onConfirm={Logout}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  ><button className='m-0 h-full w-full'>Log Out</button></Popconfirm></Menu.Item></Menu.SubMenu>}
     </Menu>
      </Drawer>

    
     <div className=' flex-row gap-10 mr-32 text-serif p-2 text-sm hidden lg:flex rounded-2xl bg-white/20 backdrop-blur-2xl'>
     
      <Link className='flex flex-row justify-center items-center gap-1 hover:text-sky-500' to='/'><CiHome/>Home</Link>
      <Link to='/dashboard' className='flex flex-row justify-center items-center gap-1 hover:text-sky-500' ><RxDashboard/>Dashboard</Link>
      <Link className='flex flex-row justify-center items-center gap-1 hover:text-sky-500' ><IoMdContact/>Contact Us</Link>
      {!user && <Link to='/login' className='flex flex-row justify-center items-center gap-1  hover:text-sky-500' >Login<IoIosLogIn/></Link>}
      {user && (<div className='flex flex-row gap-10 capitalize'><p>{user.name}</p>
      <Popconfirm
    title="Log Out"
    description="Are you sure to Log Out?"
    onConfirm={Logout}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  ><button className='w-full h-full ring-0  hover:ring-0 flex flex-row justify-center items-center gap-1 hover:text-sky-500'>Log Out<IoMdLogOut/></button></Popconfirm></div>
      )}
    </div>


      
    </div>
    </>)}
    </>
  )
}

export default Navbar