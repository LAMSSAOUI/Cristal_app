import React, { useState } from 'react';
import styles from '../styles/Demande.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';

export default function Demande() {
    const [demande, setDemande] = useState('');
    const demandes = ["Nouvelle demande", "Modification", "Désactivation"];

    const router = useRouter();
    const [formData, setFormData] = useState({
        demande: "",
        datedactivation: "",
        prenom: "",
        direction: "",
        nom: "",
        email: "",
        datdesactivation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('La fonction handleSubmit est appelée !');
        try {
            const response = await fetch('http://localhost:3000/api/save-demande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Données enregistrées avec succès !');
                router.push('/api/save-demande');
            } else {
                alert('Erreur lors de l\'enregistrement des données.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données au server :', error);
            alert('Erreur lors de l\'envoi des données au server.');
        }
    };
    const saveDemande = async (formData) => {
        const prisma = new PrismaClient(); // Initialisez PrismaClient ici

        try {
            const demande = await prisma.dmSAPSAGE.create({
                data: {
                    demande: formData.demande,
                    datedactivation: formData.datedactivation,
                    datdesactivation: formData.datdesactivation,
                    prenom: formData.prenom,
                    nom: formData.nom,
                    direction: formData.direction,
                    email: formData.email,
                    
                },
            });
            return demande;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect(); // Déconnectez-vous de la base de données après utilisation
        }
    };

    return (
        <>
            <Head>
                <title>Sage</title>
            </Head>
            <div className={styles.icon}>
                <Link href="/menu">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA3323"><path d="m480-334 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
                </Link>
            </div>
            <div className={styles.background}>
                <div className={styles.plan}>
                    <div className={styles.container}>
                        <div className={styles.centerText}>
                            
                            <img src="/images/image.png" alt="" width={300} height={100}/>
                        </div>
                        <div className={styles.demande}>
                        <form method="post" action="/api/save-demande">
                            <div className={styles.info}>
                                <h2>Information de la demande</h2>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div className={styles.rightAlign}>
                                        <label>Demande:</label>
                                        <select value={demande} onChange={(e) => setDemande(e.target.value)}>
                                            <option value="">Sélectionnez le type de demande</option>
                                            {demandes.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.rightAlign}>
                                        <label>Date d'activation:</label>
                                        <input type="text" />
                                    </div>
                                    <div className={styles.rightAlign}>
                                        <label>Prénom du bénéficiaire:</label>
                                        <input type="text" placeholder='prenom' />
                                    </div>
                                   
                                    <div className={styles.rightAlign}>
                                        <label>Direction d'affectation:</label>
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
                                <div>
                                    
                                    <div className={styles.rightAlign}>
                                        <label>Nom du bénéficiaire:</label>
                                        <input type="text" placeholder='nom' />
                                    </div>
                                    <div className={styles.rightAlign}>
                                        <label>Email:</label>
                                        <input type="text" placeholder='@gmail.com' />
                                    </div>
                                   
                                    <div className={styles.rightAlign}>
                                        <label>Date de désactivation:</label>
                                        <input type="text" />
                                    </div> 
                                </div>
                            </div>
                            <br /><div className={styles.rightAlign}>
                    <div className={styles.button6}>
                        <button className={styles.button6} onClick={handleSubmit}>Valider</button> 
                    </div>
                </div></form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}