import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [demandes, setDemandes] = useState([]);
  const [user_id, setUser_id] = useState('');
  
  useEffect(() => {
    
    const {user_id} = router.query;
    if (user_id) {
      setUser_id(user_id);
    }
  }, [router.query]);

  console.log('the users id is ', user_id);

  const handleDetailsClick = (id) => {
    router.push(`/details?id=${id}`);
  };
  const handleModifierClick = (id) => {
    router.push(`/choose?id=${id}`);
  };
  useEffect(() => {
    if (user_id) {
      fetch(`http://localhost:3000/api/demande?user_id=${user_id}`)
        .then(response => response.json())
        .then(data => {
          setDemandes(data); 
          console.log('Fetched demandes:', data);
        })
        .catch(error => {
          console.error('Error fetching demandes:', error);
        });
    }
  }, [user_id]);

  return (
    <div className='flex flex-col gap-10'>
      <Navbar />
      <div className='text-center text-2xl font-semibold'>Liste des demandes</div>
      <div className='flex justify-center'>
        <div className='flex flex-row items-center bg-black text-white gap-7 w-9/12 p-2 '>
          <div  className='w-2/12' >Numero de la demande</div>
          <div  className='w-2/12'>Date de creation</div>
          <div  className='w-2/12'>Nom du benificiaire</div>
          <div  className='w-2/12'>Type de demande</div>
          {/* <div  className='w-2/12'>Niveau de Traitement</div> */}
          {/* <div  className='grow-1'>Action</div> */}
          <div  className='grow text-center'>Actions</div>
        </div>
      </div>
      
      {/* Render each demande */}
      {demandes.map(demande => (
        <div key={demande.id} className='flex justify-center'>
          <div className='flex flex-row items-center gap-20 w-9/12 p-2 border-b border-gray-200 '>
            <div  className='w-2/12'>{demande.id}</div>
            <div  className='w-2/12'>{demande.created_at}</div>
            <div  className='w-2/12'>{demande.nom_benificier}</div>
            <div  className='w-2/12'>{demande.application_demandee}</div>
            {/* <div  className='w-2/12'>{demande.niveauTraitement}</div> */}
            {/* <div  className=''>{demande.dateTraitement}</div> */}
            <div  className='bg-black text-white rounded px-4 py-2 cursor-pointer' onClick={() => handleModifierClick(demande.id)}>Modifier</div> 
            <div  className='bg-black text-white rounded px-4 py-2 cursor-pointer' onClick={() => handleDetailsClick(demande.id)}>Details</div> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
