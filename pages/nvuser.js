import { useState } from 'react';
import styles from '../styles/nvuser.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link'; 


export default function nvuser() {
    const [identifiant, setIdentifiant] = useState('');
    const [roles, setRoles] = useState({
        utilisateur: false,
        chefDeGroupe: false,
        administrateur: false
    });

    const handleIdentifiantChange = (e) => {
        setIdentifiant(e.target.value);
    };

    const handleRoleChange = (e) => {
        const { name, checked } = e.target;
        setRoles(prevRoles => ({
            ...prevRoles,
            [name]: checked
        }));
    };

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/liste');
    };

    return (
        <>
            <Head>
                <title className={styles.title}>Création d'un utilisateur</title>
            </Head>
            <div className={styles.background}>
            
            
            
    <Link href="/listAD">
    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA3323"><path d="m480-334 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
    </Link>
        
               
            <div className={styles.form}>
                 <img src="/images/image.png" alt="" width={300} height={100}/> <br/>
            <img src="/images/icone.jpg" alt="" width={100} height={100}/>
            <h1>Créer un utilisateur </h1>
                    <form onSubmit={handleSubmit}><div className={styles.input}> 
                        <label className={styles.label}>Identifiant : </label>
                        <input
                            id="identifiant"
                            type="text"
                            placeholder="Identifiant"
                            value={identifiant}
                            onChange={handleIdentifiantChange}
                        /><br /></div> 
                        <div className={styles.input}>
                        <label className={styles.label}>Prenom : </label>
                        <input
                            id="prenom"
                            type="text"
                            placeholder="Prenom"
                            
                           
                        /><br/></div>
                        <div className={styles.input}>
                        <label className={styles.label}>Nom : </label>
                        <input
                            id="nom"
                            type="text"
                            placeholder="Nom"
                          
                           
                        /><br /></div>
                        <div className={styles.input}>
                        <label className={styles.label}>Adresse email : </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="@gmail.com"
                        /><br /></div>
                        <div className={styles.input}>
                        <label className={styles.label}>Un mot de passe : </label>
                        <input
                            id="motDePasse"
                            type="password"
                            placeholder="Mot de passe"
                        /><br /></div>
                        <div className={styles.input}>
                        <label className={styles.label}>Confirmez votre mot de passe : </label>
                        <input
                            id="confirmerMotDePasse"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                        /><br /></div>
                        <div className={styles.checkbox}>
                            <input
                                type="checkbox"
                                id="utilisateur"
                                name="utilisateur"
                                checked={roles.utilisateur}
                                onChange={handleRoleChange}
                            />
                            <label htmlFor="utilisateur">Utilisateur </label>
                        </div>
                        <div className={styles.checkbox}>
                            <input
                                type="checkbox"
                                id="chefDeGroupe"
                                name="chefDeGroupe"
                                checked={roles.chefDeGroupe}
                                onChange={handleRoleChange}
                            />
                            <label htmlFor="chefDeGroupe">Chef de Groupe </label>
                        </div>
                        <div className={styles.checkbox}>
                            <input
                                type="checkbox"
                                id="administrateur"
                                name="administrateur"
                                checked={roles.administrateur}
                                onChange={handleRoleChange}
                            />
                            <label htmlFor="administrateur">Administrateur  </label>
                        </div>
                        <br/>
                        <div className={styles.rightAlign}>
                        <div className={styles.button}>
                         <Link href="/list">
                         <button className={styles.button}>Valider</button>
                           </Link>
                         </div>
                         </div>
                    </form>
                
            </div></div>
        </>
    );
}