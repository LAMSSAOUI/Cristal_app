import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = ({id , user}) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    const { username, user_id } = router.query;
    if(id){
      setUser_id(id);
    } if(user) {
      setUsername(user);
    }else (username && user_id) 
    {
      setUsername(username);
      setUser_id(user_id);
    }
  }, [router.query]);

  

  console.log('the user id is in navbar', user_id);

  const goToHome = () => {
    router.push({
      pathname: '/home',
      query: { user_id, username },
    });
  };

  const goToListeDemande = () => {
    router.push({
      pathname: '/liste_demande',
      query: { user_id, username },
    });
  };

  const goToSettings = () => {
    router.push({
      pathname: '/settings',
      query: { user_id, username },
    });
  };

  const goToComptes = () => {
    router.push({
      pathname: '/gestionCompte',
      query: { user_id, username },
    });
  };

  const handleLogoutClick = () => {
    router.push({
      pathname: '/login',
    });
  };

  const goTobase = () => {
    if (user_id == 2) {
      router.push({
        pathname: '/baseAdmin',
        query: { user_id, username },
      });
    } else {
      router.push({
        pathname: '/base',
        query: { user_id, username },
      });
    }
  };
  const goToApplication = () => {
    router.push({
      pathname: '/gestionApplication',
      query: { user_id, username },
    });
  };
  

  return (
    <div className='flex flex-row items-center justify-between font-semibold text-sm p-2 bg-black text-white'>
      <div className='flex flex-row items-center gap-4'>
        <div onClick={goTobase} style={{ cursor: 'pointer' }}>
          <Image src="/images/logoNavbar 1.png" alt="" width={40} height={40} />
        </div>
        {/* <Image src="/images/logoNavbar 1.png" alt="" width={40} height={40} /> */}
        {user_id != '2' && <div onClick={goToHome} style={{ cursor: 'pointer' }}>Home</div>}
        <div onClick={goToListeDemande} style={{ cursor: 'pointer' }}>Demandes</div>
        <div onClick={goToSettings} style={{ cursor: 'pointer' }}>Settings</div>
        {user_id === '2' && (<div onClick={goToComptes} style={{ cursor: 'pointer' }}>Comptes</div>)}
        {user_id === '2' && (<div onClick={goToApplication} style={{ cursor: 'pointer' }}>Applications</div>)}
      </div>
      <div className='italic'>Identity Access Manager</div>
      <div className='flex flex-row items-center gap-4 italic'>
        <div>{username}</div>
        <div className='cursor-pointer' onClick={handleLogoutClick}>Logout</div>
        <Image src="/images/export.png" alt="" width={30} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
