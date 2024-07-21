import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddApplicationModal from '../../components/ApplicationModal';
import Navbar from '../../components/Navbar';

const Index = () => {
  const router = useRouter();
  const [Applications, setApplications] = useState([]);
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

    // useEffect(() => {
  //   fetch(`http://localhost:3000/api/application`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setApplications(data); 
  //     })
  //     .catch(error => {
  //       console.error('Error fetching Applications:', error);
  //     });
  // }, [user_id]);

  useEffect(() => {
    fetchApplications();
  }, [user_id]);



  const fetchApplications = ()=> {
    fetch(`http://localhost:3000/api/application`)
      .then(response => response.json())
      .then(data => {
        setApplications(data); 
      })
      .catch(error => {
        console.error('Error fetching Applications:', error);
      });
  }
  const handleAddApplicationClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveApplication = (newApplication) => {
    console.log('newApplication', newApplication);
    fetch('http://localhost:3000/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newApplication),
    })
      .then(response => response.json())
      .then(data => {
          setApplications([...Applications, data.user]);
          setIsModalOpen(false);
          alert(' Application added seccusfully.');
          fetchApplications() 
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleEditUserClick = (id) => {
    console.log('the id is in update',id)
    fetch(`http://localhost:3000/api/application?id=${id}`)
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
    console.log('Updating user', updatedUser);
    
    // Extract only the NomApplication field
    const body = JSON.stringify({ nomApp: updatedUser.NomApplication });
    
    fetch(`http://localhost:3000/api/application?id=${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body, // Send only NomApplication in the body
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          fetchApplications()
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
    fetch(`http://localhost:3000/api/application?id=${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          const updatedApplications = Applications.filter(user => user.id !== id);
          setApplications(updatedApplications);
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
      <div className='text-center text-2xl font-semibold'>Gestion des Applications</div>
      <div>
        <AddApplicationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSave={handleSaveApplication}
        />
        {/* Edit User Modal */}
        {isEditModalOpen && (
          <AddApplicationModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateUser}
            initialData={editUserData} // Pass initial data for editing
          />
        )}
      </div>
      <div className='flex flex-col gap-3 '>
        <div className='w-11/12 flex justify-end '>
          <div className='border-2 border-[#62CA76] rounded px-4 py-2 cursor-pointer w-44 text-center mr-16' onClick={handleAddApplicationClick}>
            Ajouter
          </div> 
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-row items-center bg-[#E8E8E8] text-black font-bold gap-7 w-9/12 p-2 '>
            <div className='w-2/12'>ID</div>
            <div className='w-2/12'>Nom d'application</div>
            <div className='grow text-center'>Actions</div>
          </div>
        </div>
      </div>
            {Applications && Applications.map(app => (
                <div key={app} className='flex justify-center '>
                <div className='flex flex-row items-center gap-20 w-9/12 h-15  p-2 border-b border-gray-200 '>
                    {app ? (
                    <>
                        <div className='w-2/12'>{app.id}</div>
                        <div className='w-2/12 ml-5'>{app.nomApp}</div>
                        <div className='w-full flex flex-row gap-16 justify-around'>
                            <div className=' w-40 border-2 border-[#3E6BEC] text-black rounded px-4 py-2 cursor-pointer text-center ' onClick={() => handleEditUserClick(app.id)}>Modifier</div> 
                            <div className=' w-40 border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer text-center' onClick={() => handleDeleteUser(app.id)}>Supprimer</div> 
                        </div>
                        
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
