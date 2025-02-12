import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'; // Icons for success and loading
import Lottie from 'lottie-react'; // For animations
import successAnimation from '../assets/success-animation.json';
import NavBar from './NavBar';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('https://connectverse-mern.onrender.com/api/auth/verify-email', { token });
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsVerified(true);
          setTimeout(() => navigate('/login'), 5000); // Redirect to login after 5 seconds
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.error || 'Error verifying email');
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
       {/* Navbar */}
     <NavBar/>
    <div className="min-h-[90vh] flex items-center justify-center text-black  bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">MelodyVerse</h1>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Verify Email</h2>
        <p className="text-gray-600 mb-8 text-center">
          {isLoading ? 'Verifying your email...' : isVerified ?'Your email has been verified!':'Error in Verifying Email'}
        </p>
        <div className="flex items-center justify-center">
          {isLoading ? (
            <FaSpinner className="text-6xl text-purple-600 animate-spin" /> // Loading spinner
          ) : isVerified ? (
            <Lottie animationData={successAnimation} loop={false} className="w-48 h-48" /> // Success animation
          ) : (
            <FaCheckCircle className="text-6xl text-red-500" /> // Error icon
          )}
        </div>
        <button
          onClick={() => navigate('/login')}
          className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
    </div>
  );
};

export default VerifyEmail;