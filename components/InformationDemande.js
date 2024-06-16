import React from 'react'

const InformationDemande = ({className}) => {
  return (
    <div className='flex flex-col gap-12 justify-around items-center '>
        <div className='text-center text-xl text-blue-500 mt-7'>Informations de la Demande</div>
        <div className=' flex w-10/12 items-center justify-center mb-7'>
            <div className='flex flex-row '>
                {/* First colunm  */}
                <div className='flex flex-col gap-4 grow '>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5  '>Demande</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Prenon du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Fonction du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Type du profil</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Direction d'affectation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Date d'activation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                        />
                    </div>
                </div>

                {/* Second colunm  */}
                <div className='flex flex-col gap-4 grow'>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Societe</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Nom du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <br/>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Adresse e-mail</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Site d'affectation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Date de desactivation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                        />
                    </div>
                </div>
            </div>
            

        </div>
            
        </div>

  )
}

export default InformationDemande