import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddUserModal from '../../components/UserModal';
import Navbar from '../../components/Navbar';

const Index = () => {
  const router = useRouter();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [user_id, setUser_id] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null); // State to store data for editing

  useEffect(() => {
    const { user_id } = router.query;
    if (user_id) {
      setUser_id(user_id);
    }
  }, [router.query]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
      .then(response => response.json())
      .then(data => {
        setUtilisateurs(data); 
      })
      .catch(error => {
        console.error('Error fetching utilisateurs:', error);
      });
  }, [user_id]);

  const handleAddUserClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveUser = (newUser) => {
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUtilisateurs([...utilisateurs, data.user]);
          setIsModalOpen(false);
        } else {
          alert('Failed to add user');
        }
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleEditUserClick = (id) => {
    console.log('the id is in update',id)
    fetch(`http://localhost:3000/api/users?id=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setEditUserData(data); 
          setIsEditModalOpen(true); 
        } else {
          alert('User not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleUpdateUser = (updatedUser) => {
    fetch(`http://localhost:3000/api/users?id=${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          fetchUsers();
          setIsEditModalOpen(false);
        } else {
          alert('Failed to update user');
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3000/api/users?id=${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const updatedUtilisateurs = utilisateurs.filter(user => user.id !== id);
          setUtilisateurs(updatedUtilisateurs);
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className='flex flex-col gap-8'>
      <Navbar  user_id={user_id}  />
      <div className='text-center text-2xl font-semibold'>Gestion des Utilisateurs</div>
      <div>
        <AddUserModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
        {/* Edit User Modal */}
        {isEditModalOpen && (
          <AddUserModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateUser}
            initialData={editUserData} // Pass initial data for editing
          />
        )}
      </div>
      <div className='flex flex-col gap-3 '>
        <div className='w-11/12 flex justify-end '>
          <div className='border-2 border-[#62CA76] rounded px-4 py-2 cursor-pointer w-44 text-center mr-16' onClick={handleAddUserClick}>
            Ajouter
          </div> 
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-row items-center bg-[#E8E8E8] text-black font-bold gap-7 w-9/12 p-2 '>
            <div className='w-2/12'>ID</div>
            <div className='w-2/12'>Username</div>
            <div className='w-2/12'>Password</div>
            <div className='w-2/12'>Role</div>
            <div className='grow text-center'>Actions</div>
          </div>
        </div>
      </div>
            {utilisateurs && utilisateurs.map(demande => (
                <div key={demande.id} className='flex justify-center '>
                <div className='flex flex-row items-center gap-20 w-9/12 h-15 justify-center p-2 border-b border-gray-200 '>
                    {demande ? (
                    <>
                        <div className='w-2/12'>{demande.id}</div>
                        <div className='w-2/12'>{demande.username}</div>
                        <div className='w-2/12'>{demande.password}</div>
                        <div className='w-2/12'>{demande.role}</div>
                        <div className='border-2 border-[#3E6BEC] text-black rounded px-4 py-2 cursor-pointer' onClick={() => handleEditUserClick(demande.id)}>Modifier</div> 
                        <div className='border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer' onClick={() => handleDeleteUser(demande.id)}>Supprimer</div> 
                    </>
                    ) : (
                    <div className='text-red-500'>Error: User data is missing</div>
                    )}
                </div>
                </div>
            ))}
      
    </div>
  );
};

export default Index;
