import React, { useState, useEffect } from 'react';
import styles from '../styles/listAD.module.css'
import Link from 'next/link';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';

export default function Liste() {
    const [demandesManagers, setDemandesManagers] = useState([]);
    const [filteredDemandes, setFilteredDemandes] = useState([]);

    useEffect(() => {
        const fetchDemandesManagers = async () => {
            try {
                // Vous devez implémenter cette fonction dans votre service demandesService
                const demandes = await getDemandesManagers();
                setDemandesManagers(demandes);
                setFilteredDemandes(demandes); // Initialisez les données filtrées avec toutes les demandes au début
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des demandes des managers:", error);
            }
        };

        fetchDemandesManagers();
    }, []);

    const handleSearch = (query) => {
        // Filtrer les demandes en fonction de la requête de recherche
        const filtered = demandesManagers.filter(demande => {
            // Vous devez définir votre propre logique de recherche ici
            return (
                demande.type.toLowerCase().includes(query.toLowerCase()) ||
                demande.application.toLowerCase().includes(query.toLowerCase()) ||
                demande.domaine.toLowerCase().includes(query.toLowerCase()) ||
                demande.decision.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredDemandes(filtered);
    };
    

    return (
        <>
            <Head>
                <title>Liste</title>
            </Head>
           
           <div className={styles.icon}> 
           
             <Link href="/menuAD">
             <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0000F5"><path d="M120-240v-60h520v60H120Zm678-52L609-481l188-188 43 43-145 145 146 146-43 43ZM120-452v-60h400v60H120Zm0-208v-60h520v60H120Z"/></svg>
                    </Link>
                    </div> 
            <div className={styles.background}> 
           
                    
                
                <br/>
                <div className={styles.liste}>
                    <h1>Liste des demandes des managers</h1><br/>
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#BD4C31"><path d="M733-229q27.92 0 47.46-19.56t19.54-47.5Q800-324 780.46-343q-19.54-19-47.46-19-27.5 0-46.75 19.35-19.25 19.36-19.25 47 0 27.65 19.25 47.15T733-229Zm-.21 133Q766-96 795-111.5t47-42.5q-26-14-53-22.5t-56-8.5q-29 0-56 8.5T624-154q18 27 46.79 42.5 28.78 15.5 62 15.5ZM180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v329q-14-8-29.5-13t-30.5-8v-308H180v600h309q4 16 9.02 31.17Q503.05-133.66 510-120H180Zm0-107v47-600 308-4 249Zm100-53h211q4-16 9-31t13-29H280v60Zm0-170h344q14-7 27-11.5t29-8.5v-40H280v60Zm0-170h400v-60H280v60ZM732.5-41Q655-41 600-96.5T545-228q0-78.43 54.99-133.72Q654.98-417 733-417q77 0 132.5 55.28Q921-306.43 921-228q0 76-55.5 131.5T732.5-41Z"/></svg>
                </div>
                 <div className={styles.recherche}>
                
                    <SearchBar onSearch={handleSearch} />
                </div>
                
                <br />

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Type de demande</th>
                            <th className={styles.th}>Application demandée</th>
                            <th className={styles.th}>Domaine</th>
                            <th className={styles.th}>Decision</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDemandes.map((demande, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{demande.id}</td>
                                <td>{demande.type}</td>
                                <td>{demande.application}</td>
                                <td>{demande.domaine}</td>
                                <td>{demande.decision}</td>
                                <button>Accepter</button>
                                <button>Reffuser</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}