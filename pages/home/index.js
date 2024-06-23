import React , {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'; 
import InformationDemande from '../../components/InformationDemande';
import DescriptionDemande from '../../components/DescriptionDemande';
import { useRouter } from 'next/router';

const index = () => {
  const [demande, setDemande] = useState('');
  const [direction_affectation, setDirection_affectation] = useState('');
  const [societe, setSociete] = useState('');
  const [application_demande, setApplication_demande] = useState('');
  const [prenon, setPrenom] = useState('');
  const [fonctionBeneficiaire, setFonctionBeneficiaire] = useState('');
  const [typeProfil, setTypeProfil] = useState('');
  const [dateActivation, setDateActivation] = useState('');
  const [nomBeneficiaire, setNomBeneficiaire] = useState('');
  const [adresseEmail, setAdresseEmail] = useState('');
  const [siteAffectation, setSiteAffectation] = useState('');
  const [dateDesactivation, setDateDesactivation] = useState('');
  const [domaine, setDomaine] = useState('');
  const [roleFonctionnel, setRoleFonctionnel] = useState('');
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
      societe,
      application_demande,
      prenon,
      fonctionBeneficiaire,
      typeProfil,
      dateActivation,
      nomBeneficiaire,
      adresseEmail,
      siteAffectation,
      dateDesactivation,
      domaine,
      roleFonctionnel,
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
    <div className='flex flex-col gap-5 mb-48'>
        <Navbar username={username} user_id={user_id} />
        <div className='text-center text-2xl'>Gestion des acces SAP / SAGE ERP X3 / BI</div>
        <div className='flex  justify-center'>
          <div className=' border-2 border-black flex justify-around w-10/12 rounded-md '>
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
                            value={prenon}
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Fonction du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={fonctionBeneficiaire}
                            onChange={(e) => setFonctionBeneficiaire(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Type du profil</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                            value={typeProfil}
                            onChange={(e) => setTypeProfil(e.target.value)}
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
                            value={dateActivation}
                            onChange={(e) => setDateActivation(e.target.value)}
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
                            value={nomBeneficiaire}
                            onChange={(e) => setNomBeneficiaire(e.target.value)}
                        />
                    </div>
                    <br/>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Adresse e-mail</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={adresseEmail}
                            onChange={(e) => setAdresseEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Site d'affectation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                            value={siteAffectation}
                            onChange={(e) => setSiteAffectation(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Date de desactivation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={dateDesactivation}
                            onChange={(e) => setDateDesactivation(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            

        </div>
            
        </div>
          </div>
          
        </div>
        <div className='flex justify-center '>
            <div className='border-2 border-black flex justify-around w-10/12 rounded-md'>
                        <div className='flex flex-col gap-7'>
                    <div className='text-center text-xl text-blue-500 mt-7'>Description de la Demande</div>
                    <div className='flex flex-row gap-48'>
                        <div className='flex-1/2 pl-5'>Application demandee</div>
                                        <select 
                                           id="selectOptions" 
                                           className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                                           value={application_demande} 
                                           onChange={handleapplication_demandeChange} 
                                        >
                                              {application_demande_list.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                              ))}
                                        </select>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-4 '>
                            <div className='flex-1/2 pl-5  '>Domaine</div>
                            <input
                                type="text"
                                className=' w-72 outline-none border-gray-300 border-2 rounded-md pl-3 flex-1 '
                                value={domaine}
                                onChange={(e) => setDomaine(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row gap-4 '>
                            <div className='flex-1/2 pl-5  '>Role fonctionnel</div>
                            <input
                                type="text"
                                className=' w-72 outline-none border-gray-300 border-2 rounded-md pl-3 flex-1 '
                                value={roleFonctionnel}
                                onChange={(e) => setRoleFonctionnel(e.target.value)}
                            />
                        </div>
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
  )
}

export default index