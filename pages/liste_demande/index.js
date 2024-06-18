import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/demande')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setDemandes(data); 
        console.log('this is data', demandes) 
      })
      .catch(error => {
        console.error('Error fetching demandes:', error);
      });
  }, []);

  return (
    <div className='flex flex-col gap-10'>
      <Navbar />
      <div className='text-center text-2xl font-semibold'>Liste des demandes</div>
      <div className='flex justify-center'>
        <div className='flex flex-row items-center bg-black text-white gap-7 w-9/12 p-2 '>
          <div  className='grow' >Numero de la demande</div>
          <div  className='grow'>Date de creation</div>
          <div  className='grow'>Nom du benificiaire</div>
          <div  className='grow'>Type de Profil</div>
          <div  className='grow'>Niveau de Traitement</div>
          <div  className='grow'>Date de Traitement</div>
          <div  className='grow'>Actions</div>
        </div>
      </div>
      
      {/* Render each demande */}
      {demandes.map(demande => (
        <div key={demande.id} className='flex justify-center'>
          <div className='flex flex-row items-center gap-20 w-9/12 p-2 border-b border-gray-200'>
            <div  className='w-1/6'>{demande.id}</div>
            <div  className='w-1/12'>{demande.created_at}</div>
            <div  className='w-1/12'>{demande.nom_benificier}</div>
            <div  className='w-1/6'>{demande.type_profil}</div>
            <div  className='w-1/6'>{demande.niveauTraitement}</div>
            <div  className=''>{demande.dateTraitement}</div>
            <div  className='bg-black text-white rounded px-4 py-2'>Actions</div> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
