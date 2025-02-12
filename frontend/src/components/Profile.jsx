import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './NavBar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You must be logged in to view this page.');
          setTimeout(() => navigate('/login'), 5000);
          return;
        }

        // Fetch the user's profile data
        const response = await axios.get('https://connectverse-mern.onrender.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProfile(response.data);
        } else {
          toast.error('Error fetching profile.');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching profile.');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      {/* Navbar */}
      <NavBar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        {profile ? (
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-2xl max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">👤</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {profile.name || 'Not provided'}
              </p>
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center">No profile data found.</p>
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Profile;