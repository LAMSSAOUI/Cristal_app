import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const [demandeTraiter  , setDemandeTraiter] = useState(0);
  const [demandeNonTraiter, setDemandeNonTraiter] = useState(0);
//   const [totaleDemande, setTotalDemande] = useState(0);
  const id = router.query.user_id
  console.log('the id is ',id)

  useEffect(() => {
    const fetchDemandCounts = async (id) => {
      try {
       
          const response = await fetch(`http://localhost:3000/api/info?userId=${id}`);
          const data = await response.json();
          console.log('The data is', data.untreatedDemandes[0][0].DemandeNonTraiter);
          setDemandeTraiter( data.treatedDemandes[0][0].DemandeNonTraiter);
          setDemandeNonTraiter( data.untreatedDemandes[0][0].DemandeNonTraiter);
      } catch (error) {
        console.error('Error fetching demands count:', error);
      }
    };

    if (id) {
      fetchDemandCounts(id);
    }
  }, [id]);

  return (
    <div>
       <header className='sticky top-0 z-50'><Navbar /></header>
       <div class="w-screen mt-16 ">
          <div class="mx-auto grid max-w-screen-lg gap-4 p-4 sm:grid-cols-2 lg:grid-cols-2">
            <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
              <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-500">Nombre Demande Traiter</p>
              <p class="text-4xl font-medium text-gray-800">{demandeTraiter}</p>
              <span class="float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
                3%</span
              >
            </div>

            <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
              <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-500">Nombre Demande Non Traiter</p>
              <p class="text-4xl font-medium text-gray-800">{demandeNonTraiter}</p>
              <span class="float-right rounded-full bg-emerald-100 px-1 text-sm font-medium text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                23%</span
              >
            </div>
          </div>
        </div>
    </div>
  )
}

export default index