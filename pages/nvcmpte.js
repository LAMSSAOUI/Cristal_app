import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); // Par défaut, l'utilisateur est défini comme utilisateur normal
    const router = useRouter();
  
    const handleSignup = async () => {
      // Vérifier si les mots de passe correspondent
      if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
  
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, role }), // Inclure le rôle dans les données envoyées au backend
        });
  
        if (response.ok) {
          alert(`Compte créé pour ${username}`);
          // Rediriger l'utilisateur vers une page de connexion après la création de compte réussie
          router.push('/login');
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        alert(`Une erreur s'est produite lors de la création du compte : ${error.message}`);
      }
    };

  return (
    <>
      <Head>
        <title>Créer un compte</title>
      </Head>
      <div className={styles.background}> {/* Ajoutez la classe background ici */}
      <div className={styles.menu}>
      
    <Link href="/listAD">
    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA3323"><path d="m480-334 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
    </Link>
    
    </div>
      <div className={styles.container}> <img src="/images/icone.jpg" alt="" width={100} height={100}/>
        <h1>Créer un compte</h1>
       
        <label>Nom d'utilisateur:</label>
        <div className={styles.input}>
        <input
          type="text"
          placeholder="Nom d'utilisateur..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <label>Mot de passe:</label>
        <div className={styles.input}>
        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></div>
        <label>Confirmez le mot de passe:</label>
        <div className={styles.input}>
        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /></div>
         <div>
          <label>Rôle:</label>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            Utilisateur
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Administrateur
          </label>
        </div>
        <button className={styles.button} onClick={handleSignup}>
          Créer un compte
        </button>
      </div>
      </div>
    </>
  );
}