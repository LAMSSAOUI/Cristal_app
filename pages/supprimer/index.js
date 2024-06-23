import Navbar from '../../components/Navbar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    const [demandeInfo, setDemandeInfo] = useState(null); // Initialize demandeInfo state with null or undefined

    useEffect(() => {
        if (router.query.demande_id) {
            fetch(`http://localhost:3000/api/demande?demande_id=${router.query.demande_id}`)
                .then(response => response.json())
                .then(data => {
                    setDemandeInfo(data);
                    console.log('Fetched demande:', data);
                })
                .catch(error => {
                    console.error('Error fetching demande:', error);
                });
        }
    }, [router.query.demande_id]);

    // Function to update state of inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDemandeInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleDelete = () => {
        if (router.query.demande_id) {
            fetch(`http://localhost:3000/api/demande?demande_id=${router.query.demande_id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('Demande deleted successfully');
                    // Optionally, you can redirect or perform any cleanup after deletion
                    router.push('/'); // Redirect to home page or another route
                } else {
                    console.error('Failed to delete demande');
                    // Handle error scenarios as needed
                }
            })
            .catch(error => {
                console.error('Error deleting demande:', error);
            });
        }
    };

    return (
        <div className=''>
            <header className='sticky top-0 z-50'><Navbar /></header>
            <div className='flex justify-center'>
                <form className='w-6/12 mt-16 mb-14'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Demande</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                            <div className="flex flex-col gap-9 mt-10">
                                <div className="sm:col-span-4">
                                    <label htmlFor="demande" className="block text-sm font-medium leading-6 text-gray-900">Demande</label>
                                    <div className="mt-2">
                                        <input type="text" name="demande" id="demande" value={demandeInfo?.demande || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg  pl-3 flex-1 ' />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="date_activation" className="block text-sm font-medium leading-6 text-gray-900">Date Activation</label>
                                    <div className="mt-2">
                                        <input type="text" name="date_activation" id="date_activation" value={demandeInfo?.date_activation || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 '/>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="prenom_beneficiaire" className="block text-sm font-medium leading-6 text-gray-900">Prénom Bénéficiaire</label>
                                    <div className="mt-2">
                                        <input type="text" name="prenom_beneficiaire" id="prenom_beneficiaire" value={demandeInfo?.prenom_benificier || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 ' />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="direction_affectation" className="block text-sm font-medium leading-6 text-gray-900">Direction Affectation</label>
                                    <div className="mt-2">
                                        <input type="text" name="direction_affectation" id="direction_affectation" value={demandeInfo?.direction_affectation || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 ' />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="nom_beneficiaire" className="block text-sm font-medium leading-6 text-gray-900">Nom Bénéficiaire</label>
                                    <div className="mt-2">
                                        <input type="text" name="nom_beneficiaire" id="nom_beneficiaire" value={demandeInfo?.nom_benificier || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 ' />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="adresse_email" className="block text-sm font-medium leading-6 text-gray-900">Adresse Email</label>
                                    <div className="mt-2">
                                        <input type="text" name="adresse_email" id="adresse_email" value={demandeInfo?.adresse_email || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 ' />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="date_desactivation" className="block text-sm font-medium leading-6 text-gray-900">Date Désactivation</label>
                                    <div className="mt-2">
                                        <input type="text" name="date_desactivation" id="date_desactivation" value={demandeInfo?.date_desactivation || ''} onChange={handleInputChange} className=' w-80 p-1 outline-none border-gray-300 border-2 rounded-lg pl-3 flex-1 ' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" onClick={handleDelete} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index;
