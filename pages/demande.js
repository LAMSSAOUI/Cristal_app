import React, { useState } from 'react';
import styles from '../styles/Demande.module.css'; 
import Header from '../components/Header'; 
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Demande() {
    const [demande, setDemande] = useState('');
    const [applicationDemandee, setApplicationDemandee] = useState('');
    const demandes = ["Nouvelle demande", "Modification", "Désactivation"];

    const router = useRouter();

    // Fonction pour gérer la navigation en fonction de l'application demandée
    const handleValidation = () => {
        const nextPage = applicationDemandee === 'SAP' ? '/sap' : '/sage';
        router.push(nextPage);
    };

    return (
        <>
            <Head>
                <title>Demande</title>
            </Head>
            <div className={styles.plan}>
                <div className={styles.centerText}>
                    <img src="/images/logo.jpeg" alt="" width={300} height={100}/>
                </div>
                <div className={styles.button4}>
    <Link href="/">
        <button className={styles.button4}>Retour</button>
    </Link>
</div>
    
                <Header />
                <div className={styles.centerText}>
                    <div className={styles.titre}>
                        <h2>Gestion des accès SAP / SAGE ERP X3 </h2><br/>
                    </div>
                    <img src="/images/th.jpeg" alt="" width={200} height={100}/> 
                </div> 
                <div className={styles.container}>
                
                    <div className={styles.info}>
                        <h2> Information de la demande </h2>
                    </div> 
                    <div className={styles.leftAlign}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                            <div>
                                <div className={styles.rightAlign}>
                                    <label>Demande: </label>
                                    <select value={demande} onChange={(e) => setDemande(e.target.value)}>
                                        <option value="">Sélectionnez le type de demande</option>
                                        {demandes.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <div className={styles.rightAlign}>
                                        <label className={styles.centerText}>Application demandée : </label>
                                        <select value={applicationDemandee} onChange={(e) => setApplicationDemandee(e.target.value)}>
                                            <option value="">Liste de choix </option>
                                            <option value="SAP">SAP</option>
                                            <option value="Sage">Sage</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className={styles.rightAlign}>
                                        <label className={styles.centerText}>Domaine :</label>
                                        <select>
                                            <option value="Direction Générale">Direction Générale</option>
                                            <option value="Direction Achats">Direction Achats</option>
                                            <option value="Directio Marketing">Directio Marketing</option>
                                            <option value="Direction Commerciale">Direction Commerciale</option>
                                            <option value="Direction Production">Direction Production</option>
                                            <option value="Direction Maintenance">Direction Maintenance</option>
                                            <option value="Direction Juridique">Direction Juridique</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.button6}>
                                    <button className={styles.button6} onClick={handleValidation}>Valider</button>
                                </div>
                </div>
            </div>
        </>
    );
}
