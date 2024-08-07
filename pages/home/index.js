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
  const [hasDemande, setHasDemande] = useState(false); 
  const [Applications, setApplications] = useState([]);
  const [Droits, setDroits] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const { username,  user_id} = router.query;
    if (username && user_id) {
      setUsername(username);
      setUser_id(user_id);
    }
  }, [router.query]);

  useEffect(() => {
    const {user_id} = router.query;
    if (user_id) {
        fetch(`http://localhost:3000/api/users?id=${user_id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log('user data ', data.username)
            setPrenom(data.username)
            setTypeProfil(data.role)
          } else {
            alert('User not found');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      
    }
  }, [router.query]);

  useEffect(() => {
    // Middleware function to check if user has open demands
    const checkDemandeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/activation?userId=${user_id}`);
        if (response.ok) {
          const data = await response.json();
          const numberOfDemande = data.numberOfDemande || 0;
          setHasDemande(numberOfDemande > 0);
        } else {
          console.error('Failed to fetch demande status');
        }
      } catch (error) {
        console.error('Error checking demande status:', error);
      }
    };

    if (user_id) {
      checkDemandeStatus();
    }
  }, [user_id]);

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
        if (data.success) {
          alert(` ${data.message}`);
          handleResetClick(); // Reset form fields or perform other actions
        } else {
          alert(` ${data.message}`); // Display the message from the backend
        }
        handleResetClick()
        // Handle success response (e.g., show success message)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error (e.g., show error message)
      });
  };
  useEffect(() => {
    fetchApplications();
    fetchDroits();
  }, [user_id]);



  const fetchApplications = ()=> {
    fetch(`http://localhost:3000/api/application`)
      .then(response => response.json())
      .then(data => {
        setApplications(data); 
        console.log('application', data)
      })
      .catch(error => {
        console.error('Error fetching Applications:', error);
      });
  }

  const fetchDroits = ()=> {
    fetch(`http://localhost:3000/api/droits`)
      .then(response => response.json())
      .then(data => {
        setDroits(data[0]); 
        console.log('droits', data[0])
      })
      .catch(error => {
        console.error('Error fetching Applications:', error);
      });
  }

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
                <div className='flex flex-col gap-7 grow mb-2 '>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5  '>Demande</div>
                            <select 
                               id="selectOptions" 
                               className="w-80 outline-none border-gray-300 border-2 rounded-lg pl-3"
                               value={demande} 
                               onChange={handleDemandeChange} 
                            >
                                  {Droits.map((option) => (
                                      <option key={option.id} value={option.Droits}>
                                        {option.Droits}
                                      </option>
                                    ))}
                            </select>
                    </div>
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Nom et Prenon du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={prenon}
                            onChange={(e) => setPrenom(e.target.value)}
                            disabled
                        />
                    </div>
                    {/* <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Fonction du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={fonctionBeneficiaire}
                            onChange={(e) => setFonctionBeneficiaire(e.target.value)}
                        />
                    </div> */}
                    <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Type du profil</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                            value={typeProfil}
                            onChange={(e) => setTypeProfil(e.target.value)}
                            disabled
                        />
                    </div>
                    
                    {/* <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Date d'activation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                            value={dateActivation}
                            onChange={(e) => setDateActivation(e.target.value)}
                        />
                    </div> */}
                </div>

                {/* Second colunm  */}
                <div className='flex flex-col gap-7 grow'>
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
                        <div className='flex-1 pl-5 '>Site d'affectation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                            value={siteAffectation}
                            onChange={(e) => setSiteAffectation(e.target.value)}
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
                    {/* <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Nom du benificiaire</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={nomBeneficiaire}
                            onChange={(e) => setNomBeneficiaire(e.target.value)}
                        />
                    </div> */}
                    {/* <br/> */}
                    {/* <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Adresse e-mail</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={adresseEmail}
                            onChange={(e) => setAdresseEmail(e.target.value)}
                        />
                    </div> */}
                  
                    {/* <div className='flex flex-row gap-4 '>
                        <div className='flex-1 pl-5 '>Date de desactivation</div>
                        <input
                            type="text"
                            className=' w-80 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                            value={dateDesactivation}
                            onChange={(e) => setDateDesactivation(e.target.value)}
                        />
                    </div> */}
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
                                              {Applications && Applications.map((option) => (
                                                <option key={option.id} value={option.nomApp}>{option.nomApp}</option>
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
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-4 '>
                            <div className='flex-1/2 pl-5 '>Date d'activation</div>
                            <input
                                type="date"
                                name="begin" placeholder="dd-mm-yyyy"
                                min="1997-01-01" 
                                max="2030-12-31"
                                className=' w-[235px] outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1'
                                value={dateActivation}
                                onChange={(e) => setDateActivation(e.target.value)}
                            />
                            {/* <input type="date" name="begin" placeholder="dd-mm-yyyy" 
                             value="" min="1997-01-01" max="2030-12-31"></input> */}
                        </div>
                        <div className='flex flex-row gap-4 '>
                            <div className='flex-1/2 pl-5 '>Date de desactivation</div>
                            <input
                                type="date"
                                name="begin" placeholder="dd-mm-yyyy"
                                min="1997-01-01" 
                                max="2030-12-31"
                                className=' w-[250px] outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '
                                value={dateDesactivation}
                                onChange={(e) => setDateDesactivation(e.target.value)}
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