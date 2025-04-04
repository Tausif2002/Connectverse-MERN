import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMusic, FaSpinner } from 'react-icons/fa'; // Icons for input fields
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './NavBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://connectverse-mern.onrender.com/api/auth/login', {
        email,
        password,
        rememberMe, // Send the "Remember Me" value to the backend
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);

        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error logging in');
      if (err.response?.data?.message === 'Please verify your email before logging in') {
        setShowResendButton(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.post('https://rocketdelivery.store/customer/settings?is_web_setting=1');
      console.log(response)
    }

    fetchData()
    
  },[])

  const handleResendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://connectverse-mern.onrender.com/api/auth/resend-verification-email', { email });
      toast.success(response.data.message);
      setShowResendButton(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error resending verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      {/* Navbar */}
      <NavBar />
      <div className="min-h-[90vh] text-black flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
        <ToastContainer position="top-center" />
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <FaMusic className="text-4xl text-purple-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">MelodyVerse</h1>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login to Your Account</h2>
          <p className="text-gray-600 mb-8 text-center">Welcome back to the world of music!</p>
          {isLoading ? (
            <div className="flex items-center justify-center text-center">
              <FaSpinner className="text-6xl text-purple-600 animate-spin" />
            </div>
          ) : (
            ''
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email ID
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
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
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
            {showResendButton && (
              <button
                type="button"
                onClick={handleResendVerificationEmail}
                className="w-full mt-2 text-purple-600 hover:underline"
              >
                Resend Verification Email
              </button>
            )}
            <div className="text-right mb-4">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="text-center">
              <span>Do not have an account? </span>
              <button
                onClick={() => navigate('/signup')}
                className="text-purple-600 hover:underline"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;