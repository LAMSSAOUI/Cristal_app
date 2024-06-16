import React from 'react'

const DescriptionDemande = () => {
  return (
    <div className='flex flex-col gap-7'>
        <div className='text-center text-xl text-blue-500 mt-7'>Description de la Demande</div>
        <div className='flex flex-row gap-48'>
            <div className='flex-1/2 pl-5'>Application demandee</div>
            <input
                type="text"
                className=' w-96 outline-none border-gray-300 border-2 rounded-md pl-3  '
            />
        </div>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-4 '>
                <div className='flex-1/2 pl-5  '>Domaine</div>
                <input
                    type="text"
                    className=' w-72 outline-none border-gray-300 border-2 rounded-md pl-3 flex-1 '
                />
            </div>
            <div className='flex flex-row gap-4 '>
                <div className='flex-1/2 pl-5  '>Role fonctionnel</div>
                <input
                    type="text"
                    className=' w-72 outline-none border-gray-300 border-2 rounded-md pl-3 flex-1 '
                />
            </div>
        </div>
        
        <div className='flex flex-row gap-6 justify-center mb-8'>
            <button  className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold'>
                Ajouter
            </button>
            <button  className='p-1 w-60 outline-none border-black border-2 text-center text-sm font-semibold'>
                Reset
            </button>
        </div>
       

    </div>
  )
}

export default DescriptionDemande