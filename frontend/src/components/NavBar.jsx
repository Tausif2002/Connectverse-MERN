import { FaMusic, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const isLoggedIn = localStorage.getItem('token') !== null;
  return (
    <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaMusic className="text-3xl mr-2" />
          <h1 className="text-2xl font-bold">MelodyVerse</h1>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to={'/profile'} className="flex items-center hover:text-purple-200 transition duration-300">
                <FaUser className="mr-2" />
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token'); // Logout logic
                  window.location.reload(); // Refresh the page
                }}
                className="flex items-center hover:text-purple-200 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center hover:text-purple-200 transition duration-300">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link to="/signup" className="flex items-center hover:text-purple-200 transition duration-300">
                <FaUserPlus className="mr-2" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
  )
}


export default NavBar
