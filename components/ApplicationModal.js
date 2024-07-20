import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set this according to your root element

const AddApplicationModal = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [NomApplication, setNomApplication] = useState('');
 

  // Set initial values if initialData is provided (for editing)
  useEffect(() => {
    if (initialData) {
      setNomApplication(initialData.nomApp || '');
     
    }
  }, [initialData]);

  const handleSave = () => {
    if (!initialData) {
      // Adding new user
      onSave({ NomApplication});
    } else {
      // Updating existing user
      onSave({ ...initialData, NomApplication });
    }
    setNomApplication('');
   
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add User"
      className="modal w-4/12 absolute border-white top-40 left-1/3 bg-[#fdeced] rounded-md p-10 flex flex-col gap-4 "
      overlayClassName="overlay"
    >
      <h2 className='text-left text-2xl mb-3'>{initialData ? 'Modifier Application' : 'Ajouter Application'}</h2>
      <div className='input-container flex flex-col gap-3 '>
        <label>NomApplication</label>
        <input
          type="text"
          value={NomApplication}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setNomApplication(e.target.value)}
        />
      </div>
      
      <div className='flex flex-row gap-3'>
        <button onClick={handleSave} className='border-2 border-[#62CA76] text-black rounded px-4 py-2 cursor-pointer'>Save</button>
        <button onClick={onRequestClose} className='border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer'>Close</button>
      </div>
    </Modal>
  );
};

export default AddApplicationModal;
