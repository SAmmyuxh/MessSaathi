import React,{useState} from 'react'
const Navbar = ({hostel,sethostel}) => {
  
 
  return (
    <nav className='flex justify-around items-center fixed top-0 left-0 w-full  h-14 gap-4 bg-[#f8f5f559] '>      
    <div className='font-bold text-black md:text-2xl text-sm text-left '>MessSaathi</div>
    <div className=' md:mr-0 mr-3  font-bold'> 
     <div className='relative list-none g text-black md:pl-36 md:text-xl text-sm'>{hostel} <span className='font-extrabold'>﹀</span>
     <div className='absolute  hidden md:w-40 w-24 h-22 text-center  bg-white rounded border-black'>
       <li className='md:text-[16px] text-[10px] hover:bg-green-300 cursor-pointer' onClick={()=>{sethostel("BH 1 TO 12")}}>BH 1 TO 12</li>
       <li className='md:text-[16px] text-[10px] hover:bg-green-300 cursor-pointer'onClick={()=>{sethostel("BH 7 OR 11")}}>BH 7/11</li>
       <li className='md:text-[16px] text-[10px] hover:bg-green-300 cursor-pointer' onClick={()=>{sethostel("LH 1 TO 4")}}>LH 1 TO 4</li>
     </div>
     </div>
    </div>    
  </nav>
  )
}

export default Navbar
