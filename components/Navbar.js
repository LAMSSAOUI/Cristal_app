import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

const Navbar = ({ username  , user_id}) => {

  const router = useRouter();
  console.log('the user id is in navbar', user_id);

  const goToHome = () => {
    router.push({
      pathname: '/home',
      query: { user_id: user_id }, 
    });
  };

  const goToListeDemande = () => {
    router.push({
      pathname: '/liste_demande',
      query: { user_id: user_id }, 
    });
  };
  return (
    <div className='flex flex-row items-center justify-between font-semibold  text-sm p-2 bg-black text-white'>
        <div className='flex flex-row items-center gap-4'>
          <Image 
                src="/images/logoNavbar 1.png" 
                alt="" 
                width={40} 
                height={40}
            />
            <div onClick={goToHome} style={{ cursor: 'pointer' }}>Home</div>
            <div  onClick={goToListeDemande} style={{ cursor: 'pointer' }}>Demandes</div>
        </div>   
        <div className='italic'>Identity Access Manager</div>
        <div className='flex flex-row items-center gap-4 italic'>
          <div>{username}</div>
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