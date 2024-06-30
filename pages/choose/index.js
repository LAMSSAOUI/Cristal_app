import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [path, setPath] = useState('');
  const [user_id, setUser_id] = useState('');
  const [demande , setDemandeId]=useState('');



  useEffect(() => {
    const { user_id , demande_id} = router.query;
    if (user_id && demande_id) {
      setUser_id(user_id);
      setDemandeId(demande_id);
    }
  }, [router.query]);

  const handleAppliquerClick = () => {
    router.push({
        pathname: `/${path}`,
        query: { user_id: user_id , demande_id: demande}, 
      });
  };


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
                <div className="relative mb-4">
                  <input className="peer hidden" id="radio_sap" type="radio" name="radio" onClick={() => setPath('demandeSap')} />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                  <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" htmlFor="radio_sap">
                    <span className="mb-2 text-lg font-semibold">Creation demande SAP</span>
                  </label>
                </div>
                <div className="relative mb-4">
                  <input className="peer hidden" id="radio_sage" type="radio" name="radio" onClick={() => setPath('demandeSage')} />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                  <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" htmlFor="radio_sage">
                    <span className="mb-2 text-lg font-semibold">Creation demande SAGE</span>
                  </label>
                </div>
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
};

export default Index;
