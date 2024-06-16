import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router'; 

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
      <p className='text-4xl text-right'>hello world</p>
      <div className={styles.plan}>
        <div className={styles.centerText}>
          <div className={styles.acc}>
            <h1>Identity Access Management</h1>
            <img src="/images/icone.jpg" alt="" width={100} height={100}/>
          </div>
        </div>
        <div className={styles.accueil}>
          <label>Name: </label>
          <br />
          <br />
          <input
            type="text"
            placeholder="Nom d'utilisateur..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /> <br />
          <label>Mot de passe:</label> <br /> <br />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br />
          {!isLoggedIn && (
            <div className={styles.button3}>
              <button className={styles.button3} onClick={handleLogin}>
                Se Connecter
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
                .plan {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                }
        
                .accueil {
                  width: 400px;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 8px;
                }
        
                @media (max-width: 768px) {
                  .accueil {
                    width: 90%;
                  }
                }
        
      `}</style>
    </>
  );
}