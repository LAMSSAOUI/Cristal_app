import React from 'react'
import Navbar from '../../components/Navbar'; 
import InformationDemande from '../../components/InformationDemande';

const index = () => {
  return (
    <div className='flex flex-col gap-5 '>
        <Navbar />
        <div className='text-center text-2xl'>Gestion des acces SAP / SAGE ERP X3 / BI</div>
        <div className='flex justify-center'>
          <div className=' border-2 border-black flex justify-around w-10/12 rounded-md '>
              <InformationDemande  className=''/>
          </div>
        </div>

    </div>
  )
}

export default index