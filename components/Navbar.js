import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-between font-semibold  text-sm p-2 bg-black text-white'>
        <div className='flex flex-row items-center gap-4'>
          <Image 
                src="/images/logoNavbar 1.png" 
                alt="" 
                width={40} 
                height={40}
            />
            <div>Home</div>
            <div>Demandes</div>
        </div>   
        <div className='italic'>Identity Access Manager</div>
        <div className='flex flex-row items-center gap-4 italic'>
          <div>User1</div>
          <div>User1</div>
          <Image 
                src="/images/export.png" 
                alt="" 
                width={30} 
                height={30}
            />
        </div>
        
    </div>
  )
}

export default Navbar