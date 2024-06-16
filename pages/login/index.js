import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router'; 
import Image from 'next/image';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Utilisation de useRouter pour accéder à l'objet de routage

  const handleLogin = () => {
    // Vérifiez si le nom d'utilisateur et le mot de passe sont valides
    if ((username === 'user1' && password === '123') || (username === 'admin' && password === '456')) { // Ajouter les informations de l'administrateur
      setIsLoggedIn(true);
      // Redirection vers la page demandée après la connexion réussie
      if(username === 'admin') {
        router.push('/listAD'); // Si l'utilisateur est admin, rediriger vers la page listAD
      } else {
        router.push('/menu'); // Sinon, rediriger vers la page demande
      }
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }; 
  return (
    <>
      <Head>
        <title>Accueil</title>
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen gap-16'>
        <div className='flex flex-col gap-3 items-center '>
            <Image 
                src="/images/logo1.jpg" 
                alt="" 
                width={270} 
                height={270}
            />
            <h1 className='text-xl'>Identity Access Management</h1>
        </div>
        <div className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='p-1 w-96 outline-none border-gray-300 border-2 rounded-lg pl-3 '
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-1 w-96 outline-none border-gray-300 border-2 rounded-lg pl-3 '
          />
          {!isLoggedIn && (
              <button  onClick={handleLogin} className='p-1 w-96 outline-none border-black border-2 text-center text-sm font-semibold'>
                Login
              </button>
          )}
        </div>
      </div>
    </>
  );
}