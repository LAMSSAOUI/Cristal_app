import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set this according to your root element

const AddUserModal = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Set initial values if initialData is provided (for editing)
  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username || '');
      setPassword(initialData.password || '');
      setRole(initialData.role || '');
    }
  }, [initialData]);

  const handleSave = () => {
    if (!initialData) {
      // Adding new user
      onSave({ username, password, role });
    } else {
      // Updating existing user
      onSave({ ...initialData, username, password, role });
    }
    setUsername('');
    setPassword('');
    setRole('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add User"
      className="modal w-4/12 absolute border-white top-40 left-1/3 bg-[#fdeced] rounded-md p-10 flex flex-col gap-4 "
      overlayClassName="overlay"
    >
      <h2 className='text-left text-2xl mb-3'>{initialData ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h2>
      <div className='input-container flex flex-col gap-3 '>
        <label>Username</label>
        <input
          type="text"
          value={username}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Password</label>
        <input
          type="password"
          value={password}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Role</label>
        <input
          type="text"
          value={role}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-3'>
        <button onClick={handleSave} className='border-2 border-[#62CA76] text-black rounded px-4 py-2 cursor-pointer'>Save</button>
        <button onClick={onRequestClose} className='border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer'>Close</button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
