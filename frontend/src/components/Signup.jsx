import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMusic, FaSpinner, FaImage } from 'react-icons/fa'; // Icons for input fields
import NavBar from './NavBar';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // Optional field: Full Name
  const [profilePicture, setProfilePicture] = useState(null); // Optional field: Profile Picture
  const [profilePicturePreview, setProfilePicturePreview] = useState(null); // For preview
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (name) formData.append('name', name); // Optional field
      if (profilePicture) formData.append('profilePicture', profilePicture); // Optional field

      const response = await axios.post('https://connectverse-mern.onrender.com/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => navigate('/login'), 5000); // Redirect to login after 5 seconds
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
       {/* Navbar */}
     <NavBar/>
    <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <ToastContainer position="top-center" />
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center">
            <FaMusic className="text-4xl text-purple-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">MelodyVerse</h1>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create Your Account</h2>
        <p className="text-gray-600 mb-8 text-center">Join the world of music today!</p>
        <form onSubmit={handleSignup}>

        <div className="flex flex-col items-center justify-center mb-6">
          {/* Profile Picture Preview and Upload */}
          <label htmlFor="profilePicture" className="cursor-pointer">
            {profilePicturePreview ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 mb-4">
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FaImage className="text-4xl text-gray-400" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleProfilePictureChange}
            className="hidden"
            accept="image/*"
          />
        </div>
          {/* Full Name (Optional) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Username (Required) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Email (Required) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Password (Required) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Required) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <FaSpinner className="text-6xl text-purple-600 animate-spin" />
          </div>
        )}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;