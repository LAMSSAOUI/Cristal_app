import Navbar from '../../components/Navbar'
import React from 'react'

const index = () => {
  return (
    <div className='flex flex-col gap-10 '>
        <Navbar />
        <div className='text-center text-2xl font-semibold'>Liste des demandes</div>
        <div className='flex justify-center'>
             <div className='flex flex-row items-center bg-black text-white gap-7 w-9/12 p-2'>
                 <div>Numero de la demande</div>
                 <div>Date de creation</div>
                 <div>Nom du benificiaire</div>
                 <div>Type de Profil</div>
                 <div>Niveau de Traitement</div>
                 <div>Date de Traitement</div>
                 <div>Actions</div>
             </div>
        </div>
        
    </div>
  )
}

export default index