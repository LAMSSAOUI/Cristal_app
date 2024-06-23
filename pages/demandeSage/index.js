import React, { useEffect, useState } from 'react';
import styles from '../../styles/Demande.module.css'; 
import Header from '../../components/Header';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function demande () {
    const [demandeInfo, setDemandeInfo] = useState({
        demande: '',
        date_activation: '',
        prenom_beneficiaire: '',
        direction_affectation: '',
        nom_beneficiaire: '',
        adresse_email: '',
        date_desactivation: '',
      });
      const [username, setUsername] = useState('');
      const [user_id, setUser_id] = useState('');
    
      const router = useRouter();
    
      useEffect(() => {
        const { username, user_id } = router.query;
        if (username && user_id) {
          setUsername(username);
          setUser_id(user_id);
        }
      }, [router.query]);
    
      const DemandeList = ['Nouvelle Demande', 'Modification', 'Desactivation'];
      const direction_affectation_list = ['Direction Generale', 'Direction Achats', 'Direction Marketing', 'Direction Commerciale', 'Direction Production', 'Direction Maintenance', 'Direction Juridique'];
    
      useEffect(() => {
        console.log('Checking user_id and demande_id:', user_id, router.query.demande_id);
        if (router.query.demande_id) {
          fetch(`http://localhost:3000/api/demande?demande_id=${router.query.demande_id}`)
            .then(response => response.json())
            .then(data => {
              setDemandeInfo(data);
              console.log('Fetched demande:', data);
            })
            .catch(error => {
              console.error('Error fetching demande:', error);
            });
        }
      }, [user_id, router.query.demande_id]);
    
      const handleSaveClick = () => {
        const data = { ...demandeInfo, user_id };
        fetch('http://localhost:3000/api/demande', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert('Success');
            handleResetClick();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    
      const handleResetClick = () => {
        setDemandeInfo({
          demande: '',
          date_activation: '',
          prenom_beneficiaire: '',
          direction_affectation: '',
          nom_beneficiaire: '',
          adresse_email: '',
          date_desactivation: '',
        });
      };
    
      const handleChange = (field, value) => {
        setDemandeInfo(prevState => ({
          ...prevState,
          [field]: value,
        }));
      };
    return (
        <div className=''>
            <Navbar username={username} user_id={user_id} />
            <div className='flex items-center h-[40rem] justify-center'>            
                <div className=' border-2 border-gray-400 flex justify-around w-10/12 rounded-md '>
                    <div className='flex flex-col gap-6 justify-around items-center '>
                        <div className='mt-3'>
                            <Image 
                                src="/images/image.png" 
                                alt="" 
                                width={150} 
                                height={50} 
                            />

                        </div>
                        <div className='text-center text-xl text-gray-500 mb-4 '>Informations sur la Demande SAGE </div>
                        <div className='flex w-10/12 items-center justify-center mb-7'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col gap-5 grow'>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Demande</div>
                                <select
                                id="selectOptions"
                                className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                                value={demandeInfo.demande}
                                onChange={(e) => handleChange('demande', e.target.value)}
                                >
                                {DemandeList.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Date d'activation</div>
                                <input
                                type="text"
                                className='w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={demandeInfo.date_activation}
                                onChange={(e) => handleChange('date_activation', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Prenon du bénéficiaire</div>
                                <input
                                type="text"
                                className='w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={demandeInfo.prenom_benificier}
                                onChange={(e) => handleChange('prenom_beneficiaire', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Direction d'affectation</div>
                                <select
                                id="selectOptions"
                                className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                                value={demandeInfo.direction_affectation}
                                onChange={(e) => handleChange('direction_affectation', e.target.value)}
                                >
                                {direction_affectation_list.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Nom du bénéficiaire</div>
                                <input
                                type="text"
                                className='w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={demandeInfo.nom_benificier}
                                onChange={(e) => handleChange('nom_beneficiaire', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Adresse email</div>
                                <input
                                type="text"
                                className='w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={demandeInfo.adresse_email}
                                onChange={(e) => handleChange('adresse_email', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-1 pl-5'>Date de désactivation</div>
                                <input
                                type="text"
                                className='w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={demandeInfo.date_desactivation}
                                onChange={(e) => handleChange('date_desactivation', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-row gap-6 justify-center mb-8'>
                                <button className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold' onClick={handleSaveClick}>
                                Ajouter
                                </button>
                                <button className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold' onClick={handleResetClick}>
                                Reset
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}