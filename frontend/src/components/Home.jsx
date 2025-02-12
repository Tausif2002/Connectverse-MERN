import { Link } from "react-router-dom";
import { FaMusic, FaHeadphones } from "react-icons/fa";
import NavBar from "./NavBar";

const Homepage = () => {
  // Check if the user is logged
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      {/* Navbar */}
      <NavBar />

      {/* Conditional Rendering for Before Login and After Login Content */}
      {isLoggedIn ? (
        // After Login Homepage
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome Back, User!</h1>

          {/* Recommended Playlists */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recommended Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaMusic className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Chill Vibes</h3>
                <p className="text-gray-600">
                  Relaxing tunes for your downtime.
                </p>
              </div>
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaHeadphones className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Workout Beats</h3>
                <p className="text-gray-600">
                  Energetic tracks to keep you moving.
                </p>
              </div>
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaMusic className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Throwback Hits</h3>
                <p className="text-gray-600">Nostalgic songs from the past.</p>
              </div>
            </div>
          </div>

          {/* Recently Played */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaMusic className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Song Title 1</h3>
                <p className="text-gray-600">Artist Name</p>
              </div>
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaMusic className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Song Title 2</h3>
                <p className="text-gray-600">Artist Name</p>
              </div>
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <FaMusic className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Song Title 3</h3>
                <p className="text-gray-600">Artist Name</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Before Login Homepage
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to MelodyVerse</h1>
          <p className="text-xl mb-8">
            Your gateway to endless music. Discover, stream, and enjoy.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
