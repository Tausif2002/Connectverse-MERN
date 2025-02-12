import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaLock, FaArrowLeft, FaMusic } from 'react-icons/fa';
import NavBar from './NavBar';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://connectverse-mern.onrender.com/api/auth/reset-password', { token, newPassword });
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
       {/* Navbar */}
     <NavBar/>
    <div className=" min-h-[90vh] flex items-center justify-center text-black  bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <ToastContainer position="top-center" />
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <FaMusic className="text-4xl text-purple-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">MelodyVerse</h1>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Reset Password</h2>
        <p className="text-gray-600 mb-8 text-center">Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Reset Password
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-2 text-purple-600 hover:underline flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;