import React , {useState}from 'react'

const InformationDemande = ({className}) => {
   const [demande, setDemande] = useState('');
   const [direction_affectation, setDirection_affectation] = useState('');
   const [societe, setSociete] = useState('');
   const [application_demande, setApplication_demande] = useState('');


   const DemandeList = ['Nouvelle Demande', 'Modification', 'Desactivation'];
   const direction_affectation_list = ['Direction Generale', 'Direction Achats', 'Direction Marketing' , 'Direction Commerciale' , 'Direction Production' , 'Direction Maintenance ' , 'Direction Juridique'];
   const Societe_list = ['Lesieur Cristal', 'Indusalim', 'Amont Agricol' ];
   const application_demande_list = ['SAP', 'Sage', 'Assabil' ];




    const handleDemandeChange = (event) => {
        setDemande(event.target.value);
    };
    const handleDirectionAffectationChange = (event) => {
        setDirection_affectation(event.target.value);
    };
    const handleSocieteChange = (event) => {
        setSociete(event.target.value);
    };
    const handleapplication_demandeChange = (event) => {
        setApplication_demande(event.target.value);
    };

 
  return (
    <div className='flex flex-col gap-12 justify-around items-center '>
        <div className='text-center text-xl text-blue-500 mt-7'>Informations de la Demande</div>
        <div className=' flex w-10/12 items-center justify-center mb-7'>
            <div className='flex flex-row '>
                {/* First colunm  */}
                <div className='flex flex-col gap-4 grow '>
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
                        <select 
                               id="selectOptions" 
                               className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                               value={societe} 
                               onChange={handleSocieteChange} 
                            >
                                  {Societe_list.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                            </select>
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