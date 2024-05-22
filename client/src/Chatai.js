// import { Input } from 'antd'
import React from 'react'
// import { CiSearch } from 'react-icons/ci'
import {IoMdSend } from 'react-icons/io'

const Chatai = () => {
  return (
    <div className='pt-16 flex bg-black text-white absolute top-0 bottom-0 right-0 left-0 w-full h-full'>
        <aside className='w-80  '>
          <button className='border border-border m-3 mt-2  w-72 h-12 text-center text-xl'>+ New chat</button>
        </aside>
        <section className='  flex flex-col w-full bg-slate-900'>section
        <div className='bg-slate-800 rounded-lg p-2 m-6'></div>
        <footer className='absolute bottom-5 w-full pl-6 '><form action="submit" className='border border-border  rounded-lg  w-1/2 flex flext-row  items-center bg-slate-800 h-12 max-h-32'><textarea type="text" className='w-full rounded-lg  flex focus:ring-0 focus-visible:ring-0 resize  h-full  bg-slate-800 border-0' placeholder='What can i help you?'/><button className='pr-2'><IoMdSend className='text-xl text-slate-400 hover:text-white'/> </button></form></footer>
        
        </section>
        
    </div>
  )
}

export default Chatai