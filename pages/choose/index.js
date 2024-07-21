import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [path, setPath] = useState('');
  const [user_id, setUser_id] = useState('');
  const [demande , setDemandeId]=useState('');
  const [demandeValidation , setDemandeValidation] = useState(0);
  const [Applications, setApplications] = useState([]);



  useEffect(() => {
    const { user_id , demande_id} = router.query;
    if (user_id && demande_id) {
      setUser_id(user_id);
      setDemandeId(demande_id);
    }
  }, [router.query]);

  useEffect(() => {
    if (demande) {
      fetch(`http://localhost:3000/api/demande?demande_id=${demande}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched demande:', data.isValide);
          setDemandeValidation(data.isValide);
        })
        .catch(error => {
          console.error('Error fetching demande:', error);
        });
    }
  }, [demande]);

  const handleAppliquerClick = () => {
    router.push({
        pathname: `/${path}`,
        query: { user_id: user_id , demande_id: demande}, 
      });
  };
  useEffect(() => {
    fetchApplications();
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

  const handleApplicationClick = (nomApp) => {
    router.push({
      pathname: '/creationApplication',
      query: { application: nomApp, user_id: user_id, demande_id: demande },
    });
  };
  
  if (!demandeValidation) {
  return (
    <div>
      <header className='sticky top-0 z-50'><Navbar /></header>
      <div className="flex w-screen-[30px] items-center justify-center bg-gray-100 p-17 h-screen">
        <div className="flex w-[37rem] flex-col rounded-2xl bg-white px-6 shadow-2xl sm:px-14">
          <div className="flex w-full justify-between self-start pt-10 pb-5">
            <h2 className="font-serif text-2xl font-semibold text-gray-700">Choose what you want</h2>
          </div>
          <div className="flex w-full flex-col pb-8 pt-4">
            <div className="relative mb-4">
              <input className="peer hidden" id="radio_supprimer" type="radio" name="radio" onClick={() => setPath('supprimer')} />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
              <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" htmlFor="radio_supprimer">
                <span className="mb-2 text-lg font-semibold">Supprimer</span>
              </label>
            </div>
            <div className="relative mb-4">
              <input className="peer hidden" id="radio_modifier" type="radio" name="radio" onClick={() => setPath('modifier')} />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
              <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" htmlFor="radio_modifier">
                <span className="mb-2 text-lg font-semibold">Modifier</span>
              </label>
            </div>
            {user_id && user_id == '2' && (
              <>
               {Applications.map((app, index) => (
                  <div key={index} className="relative mb-4">
                    <input 
                      className="peer hidden" 
                      id={`radio_${app.nomApp}`} 
                      type="radio" 
                      name="radio" 
                      onClick={() => handleApplicationClick(app.nomApp)}
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                    <label 
                      className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" 
                      htmlFor={`radio_${app.nomApp}`}
                    >
                      <span className="mb-2 text-lg font-semibold">Creation demande {app.nomApp}</span>
                    </label>
                  </div>
                ))}
                
                <div className="relative mb-4">
                  <input className="peer hidden" id="radio_valide" type="radio" name="radio" onClick={() => setPath('valider')} />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                  <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" htmlFor="radio_valide">
                    <span className="mb-2 text-lg font-semibold">Valider</span>
                  </label>
                </div>
              </>
            )}
            <button className="my-2 rounded-md bg-gray-900 py-3 font-medium text-white" onClick={handleAppliquerClick}>Appliquer</button>
          </div>
        </div>
      </div>
    </div>
  );
}else if (demandeValidation) {
  return (
    <div className='h-screen'>
        <header className='sticky top-0 z-50'><Navbar /></header>
        <div className="flex justify-center items-center"  style={{ height: 'calc(100vh - 64px)' }}>
          <p className='bold text-2xl '>La demande et deja valide</p>
        </div>
    </div>
    
  );
}
}

export default Index;
