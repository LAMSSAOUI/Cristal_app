import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set this according to your root element

const AddUserModal = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [societe, setSociete] = useState('');
  const [typeDeProfile, setTypeDeProfile] = useState('');
  const [departement, setDepartement] = useState('');

  // Set initial values if initialData is provided (for editing)
  useEffect(() => {
    if (initialData) {
      setUsername(initialData.login || '');
      setPassword(initialData.password || '');
      setRole(initialData.role || '');
      setNom(initialData.nom || '');
      setPrenom(initialData.prenom || '');
      setEmail(initialData.email || '');
      setSociete(initialData.societe || '');
      setTypeDeProfile(initialData.type_de_profile || '');
      setDepartement(initialData.departement || '');
    }
  }, [initialData]);

  const societeOptions=['soc1', 'soc2', 'soc3'];

  const handleSave = () => {
    const userData = {
      login,
      password,
      role,
      nom,
      prenom,
      email,
      societe,
      type_de_profile: typeDeProfile,
      departement
    };

    onSave(initialData ? { ...initialData, ...userData } : userData);

    // Clear fields
    setUsername('');
    setPassword('');
    setRole('');
    setNom('');
    setPrenom('');
    setEmail('');
    setSociete('');
    setTypeDeProfile('');
    setDepartement('');

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add User"
      className="modal w-fit absolute border-white  top-40 left-1/4 bg-[#fdeced] rounded-md p-10 flex flex-col gap-4"
      overlayClassName="overlay"
    >
      <h2 className='text-left text-2xl mb-3'>{initialData ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h2>
      <div className='flex flex-row gap-14 '>

      <div>
      <div className='input-container flex flex-col gap-3'>
        <label>Login</label>
        <input
          type="text"
          value={login}
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
      <div className='input-container flex flex-col gap-3'>
        <label>Nom</label>
        <input
          type="text"
          value={nom}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Prenom</label>
        <input
          type="text"
          value={prenom}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setPrenom(e.target.value)}
        />
      </div>
          
      </div>
      <div>
  
      <div className='input-container flex flex-col gap-3'>
        <label>Email</label>
        <input
          type="email"
          value={email}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Société</label>
        <select
          value={societe}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setSociete(e.target.value)}
        >
          {societeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          value={societe}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setSociete(e.target.value)}
        /> */}
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Type de Profile</label>
        <input
          type="text"
          value={typeDeProfile}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setTypeDeProfile(e.target.value)}
        />
      </div>
      <div className='input-container flex flex-col gap-3'>
        <label>Département</label>
        <input
          type="text"
          value={departement}
          className='w-72 outline-none border-gray-300 border-2 rounded-lg pl-3'
          onChange={(e) => setDepartement(e.target.value)}
        />
      </div>
            
      </div>
              
      </div>
      <div className='flex flex-row gap-3'>
        <button onClick={handleSave} className='border-2 border-[#62CA76] text-black rounded px-4 py-2 cursor-pointer'>Save</button>
        <button onClick={onRequestClose} className='border-2 border-[#EB444B] text-black rounded px-4 py-2 cursor-pointer'>Close</button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
