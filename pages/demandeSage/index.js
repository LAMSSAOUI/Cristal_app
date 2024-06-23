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
    const [demande, setDemande] = useState('');
    const [direction_affectation, setDirection_affectation] = useState('');
    const [prenon, setPrenom] = useState('');
    const [dateActivation, setDateActivation] = useState('');
    const [nomBeneficiaire, setNomBeneficiaire] = useState('');
    const [adresseEmail, setAdresseEmail] = useState('');
    const [dateDesactivation, setDateDesactivation] = useState('');
    const [username, setUsername] = useState('');
    const [user_id, setUser_id] = useState('');

    const router = useRouter();
  
    useEffect(() => {
      const { username,  user_id} = router.query;
      if (username && user_id) {
        setUsername(username);
        setUser_id(user_id);
      }
    }, [router.query]);
  
  
    const DemandeList = ['Nouvelle Demande', 'Modification', 'Desactivation'];
    const direction_affectation_list = ['Direction Generale', 'Direction Achats', 'Direction Marketing' , 'Direction Commerciale' , 'Direction Production' , 'Direction Maintenance ' , 'Direction Juridique'];
  
  
  
  
     const handleDemandeChange = (event) => {
         setDemande(event.target.value);
     };
     const handleDirectionAffectationChange = (event) => {
         setDirection_affectation(event.target.value);
     };

     const handleResetClick = () => {
      // Implement reset logic here
      setDemande('');
      setDirection_affectation('');
      setSociete('');
      setApplication_demande('');
      setPrenom('');
      setFonctionBeneficiaire('');
      setTypeProfil('');
      setDateActivation('');
      setNomBeneficiaire('');
      setAdresseEmail('');
      setSiteAffectation('');
      setDateDesactivation('');
      setDomaine('');
      setRoleFonctionnel('');
      // Reset other fields as needed
    };
    const handleSaveClick = () => {
      const data = {
        demande,
        direction_affectation,
        prenon,
        dateActivation,
        nomBeneficiaire,
        adresseEmail,
        dateDesactivation,
        user_id
      };
  
      // Example of API call (replace with your actual API endpoint and method)
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
          alert('Success')
          handleResetClick()
          // Handle success response (e.g., show success message)
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error (e.g., show error message)
        });
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
                        <div className=' flex w-10/12 items-center justify-center mb-7'>
                            <div className='flex flex-row '>
                                {/* First colunm  */}
                                <div className='flex flex-col gap-5 grow '>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5  '>Demande</div>
                                            <select 
                                            id="selectOptions" 
                                            className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                                            value={demande} 
                                            onChange={handleDemandeChange} 
                                            >
                                                {DemandeList.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Date d'activation</div>
                                        <input
                                            type="text"
                                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                                            value={dateActivation}
                                            onChange={(e) => setDateActivation(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Prenon du benificiaire</div>
                                        <input
                                            type="text"
                                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                                            value={prenon}
                                            onChange={(e) => setPrenom(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Direction d'affectation</div>
                                        <select 
                                            id="selectOptions" 
                                            className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                                            value={direction_affectation} 
                                            onChange={handleDirectionAffectationChange} 
                                            >
                                                {direction_affectation_list.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Nom du bénéficiaire:</div>
                                        <input
                                            type="text"
                                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                            value={nomBeneficiaire}
                                            onChange={(e) => setNomBeneficiaire(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Addrese email:</div>
                                        <input
                                            type="text"
                                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                            value={adresseEmail}
                                            onChange={(e) => setAdresseEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-4 '>
                                        <div className='flex-1 pl-5 '>Date de désactivation:</div>
                                        <input
                                            type="text"
                                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                            value={dateDesactivation}
                                            onChange={(e) => setDateDesactivation(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-6 justify-center mb-8'>
                                        <button  className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold' onClick={handleSaveClick}>
                                            Ajouter
                                        </button>
                                        <button  className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold' onClick={handleResetClick}>
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