import React from 'react'

const Footer = () => {
  return (
    <div className='relative bottom-0 bg-[#fff] flex justify-center items-center h-10 w-full text-center'>
   <span className='md:text-sm'>Developed By <img  src='/icons8-github.svg' className='h-[20px] inline'/> <a href='https://github.com/SAmmyuxh' target="_blank" className='font-semibold underline md:text-sm text-xs'>Samruddh Shubhadarshi</a>      </span>
   <span><img src='/icons8-linkedin.svg'className='h-[20px] inline'/><a href='https://www.linkedin.com/in/samruddh-shubha-darshi-4a2537291/' className='font-semibold underline md:text-sm text-xs'>Samruddh </a></span>
    </div>
  )
}

export default Footer
