import React, { useState , useEffect} from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router'; 

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Utilisation de useRouter pour accéder à l'objet de routag

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
    <div></div>
  );
}