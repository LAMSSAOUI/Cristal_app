import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddDroitsModal from '../../components/DroitsModal';
import Navbar from '../../components/Navbar';

const Index = () => {
  const router = useRouter();
  const [Droits, setDroits] = useState([]);
  const [user_id, setUser_id] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    const { user_id } = router.query;
    if (user_id) {
      setUser_id(user_id);
    }
  }, [router.query]);

  useEffect(() => {
    fetchDroits();
  }, [user_id]);

  const fetchDroits = () => {
    fetch('http://localhost:3000/api/droits')
      .then(response => response.json())
      .then(data => {
        setDroits(data[0]);
        console.log('droits', data[0]);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des droits:', error);
      });
  };

  const handleAddDroitsClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveDroits = (newDroits) => {
    console.log('Nouveau droits', newDroits);
    fetch('http://localhost:3000/api/droits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDroits),
    })
      .then(response => response.json())
      .then(data => {
        setDroits([...Droits, data]);
        setIsModalOpen(false);
        alert('Droits ajoutés avec succès.');
        fetchDroits();
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de droits', error);
      });
  };

  const handleEditUserClick = (id) => {
    console.log('ID pour la modification', id);
    fetch(`http://localhost:3000/api/droits?id=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setEditUserData(data);
          console.log('byid data ', data);
          setIsEditModalOpen(true);
        } else {
          alert('Droits non trouvés');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  };

  const handleUpdateUser = (updatedUser) => {
    console.log('Mise à jour des droits', updatedUser);
  
    const body = JSON.stringify({ id: updatedUser[0].id, droits: updatedUser.droits });
    console.log('body', body);
    fetch('http://localhost:3000/api/droits', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          fetchDroits();
          setIsEditModalOpen(false);
        } else {
          alert('Échec de la mise à jour des droits');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des droits:', error);
      });
  };
  

  const handleDeleteUser = (id) => {
    fetch('http://localhost:3000/api/droits', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          const updatedDroits = Droits.filter(droit => droit.id !== id);
          setDroits(updatedDroits);
          alert('Droits supprimés avec succès');
        } else {
          alert('Échec de la suppression des droits');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression des droits:', error);
      });
  };
  

  return (
    <div className='flex flex-col gap-8'>
      <Navbar user_id={user_id} />
      <div className='text-center text-2xl font-semibold'>Gestion des Droits</div>
      <div>
        <AddDroitsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSave={handleSaveDroits}
        />
        {isEditModalOpen && (
          <AddDroitsModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateUser}
            initialData={editUserData}
          />
        )}
      </div>
      <div className='flex flex-col gap-3'>
        <div className='w-11/12 flex justify-end'>
          <div className='border-2 border-black rounded px-4 py-2 cursor-pointer w-44 text-center mr-16' onClick={handleAddDroitsClick}>
            Ajouter
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-row items-center bg-[#E8E8E8] text-black font-bold gap-7 w-9/12 p-2'>
            <div className='w-2/12'>ID</div>
            <div className='w-2/12'>Droits</div>
            <div className='grow text-center'>Actions</div>
          </div>
        </div>
      </div>
      {Droits && Droits.map(droit => (
        <div key={droit.id} className='flex justify-center'>
          <div className='flex flex-row items-center gap-20 w-9/12 h-15 p-2 border-b border-gray-200'>
            <div className='w-2/12'>{droit.id}</div>
            <div className='w-2/12 ml-5'>{droit.Droits}</div>
            <div className='w-full flex flex-row gap-16 justify-around'>
              <div className='bg-black text-white rounded px-4 py-2 cursor-pointer' onClick={() => handleEditUserClick(droit.id)}>Modifier</div>
              <div className='bg-black text-white rounded px-4 py-2 cursor-pointer' onClick={() => handleDeleteUser(droit.id)}>Supprimer</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
