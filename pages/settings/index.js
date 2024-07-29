import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const [userData, setUserData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [id , setUser_id] = useState('');
    const [username, setUsername] = useState('');

  
    useEffect(() => {
      // Example of fetching user data on component mount
      fetchUserData();
    }, []);

    useEffect(() => {
      const { username, user_id } = router.query;
      if (username && user_id) 
        {
          setUsername(username);
          setUser_id(user_id);
        }
      }, [router.query]);
  
    const fetchUserData = async () => {
      try {
        console.log('the id is ', id)
        const response = await fetch(`http://localhost:3000/api/admin?id=${id}`); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log('the user data is', data)
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const handleSavePassword = async () => {
      const response = await fetch('/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
  
      if (response.ok) {
        alert('Password updated successfully');
      } else {
        const errorData = await response.json();
        alert(`Error updating password: ${errorData.message}`);
      }
    };

    const handleUpdateUser = async () => {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          username,
          password: newPassword,
          role: userData ? userData.role : 'user',
        }),
      });
  
      if (response.ok) {
        alert('User updated successfully');
        resetForm()
      } else {
        const errorData = await response.json();
        alert(`Error updating user: ${errorData.message}`);
      }
    };
    const resetForm = () => {
      setNewPassword('')
      setCurrentPassword('')
  };

  return (
    <div>
      <header className='sticky top-0 z-50'><Navbar user_id={id} /></header>
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto mt-6">
        <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
            <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 bg-red-700 peer-checked:ring">Accounts </label>
            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
            </ul>
          </div>
    
          <div className="col-span-2 hidden sm:block">
            <ul>
              <li className="mt-5 cursor-pointer border-l-2 border-l-red-700 px-2 py-2 font-semibold  transition  ">Profile</li>
            </ul>
          </div>
    
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
              <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> 
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Username</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-gray-600">Your username  is <strong>{username}</strong></p>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex items-center">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label htmlFor="current-password">
                  <span className="text-sm text-gray-500">Current Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="current-password"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      value={userData && userData.password}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </label>
                <label htmlFor="new-password">
                  <span className="text-sm text-gray-500">New Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="new-password"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </div>
            <button onClick={handleUpdateUser} className=" rounded-lg bg-red-700 px-4 py-2 text-white mt-5">Update Password</button>
            <hr className="mt-4 mb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
