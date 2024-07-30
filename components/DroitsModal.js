import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set this according to your root element

const AddDroitsModal = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [droits, setDroits] = useState('');

  useEffect(() => {
    if (initialData) {
      console.log('initialData', initialData[0]);        
      setDroits(initialData[0].Droits || '');
    }
  }, [initialData]);

  const handleSave = () => {
    const droitsData = {
      droits,
    };

    onSave(initialData ? { ...initialData, ...droitsData } : droitsData);

    // Clear fields
    setDroits('');

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Droits"
      className="modal w-fit absolute border-white top-40 left-1/4 bg-[#fdeced] rounded-md p-10 flex flex-col gap-4"
      overlayClassName="overlay"
    >
      <h2 className='text-left text-2xl mb-3'>{initialData ? 'Modifier Droits' : 'Ajouter Droits'}</h2>
      <div className='flex flex-col gap-3'>
        <label>Droits</label>
        <input
          type="text"
          value={droits}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setDroits(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-3 mt-4'>
        <button onClick={handleSave} className='border-2 border-[#62CA76] text-black rounded px-4 py-2 cursor-pointer'>Save</button>
        <button onClick={onRequestClose} className='border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer'>Close</button>
      </div>
    </Modal>
  );
};

export default AddDroitsModal;
