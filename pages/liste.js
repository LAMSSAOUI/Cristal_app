import React, { useState, useEffect } from 'react';
import styles from '../styles/liste.module.css';
import Header from '../components/Header';
import Link from 'next/link';
import Head from 'next/head';


export default function Liste() {
    const [demandesManagers, setDemandesManagers] = useState([]);

    useEffect(() => {
        const fetchDemandesManagers = async () => {
            try {
                // Vous devez implémenter cette fonction dans votre service demandesService
                const demandes = await getDemandesManagers();
                setDemandesManagers(demandes);
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des demandes des managers:", error);
            }
        };

        fetchDemandesManagers();
    }, []);

    return (
        
    <>
        <Head>
            <title>Liste</title>
        </Head>
        <div className={styles.icon}>
        <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA3323"><path d="m480-334 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>          
            </Link>
        </div>
        <div className={styles.background}>
       
         <img src="/images/logo.jpeg" alt="" width={150} height={50}/>
         
        
            
        <div className={styles.rightAlign}>
       </div>


        <div className={styles.liste}>
            <h1>Liste des demandes</h1>
        </div>

        

        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    
                    <th className={styles.th}>Date D'activation  </th>
                    <th className={styles.th}>Nom du beneficiaire</th>
                    <th className={styles.th}>Type de profil </th>
                    <th className={styles.th}>Niveau de Traitement </th>
                    <th className={styles.th}>Action </th>
                </tr>
            </thead>
            <tbody>
                {demandesManagers.map((demande, index) => (
                    <tr key={index} className={styles.body}>
                        <td>{demande.numDemande}</td>
                        <td>{demande.dateCreation}</td>
                        <td>{demande.nomBeneficiaire}</td>
                        <td>{demande.typeProfil}</td>
                        <td>{demande.niveauTraitement}</td>
                        
                        <td><Link href={`/detail/${demande.id}`}>Détail</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
</div>
        
    </>
);
}