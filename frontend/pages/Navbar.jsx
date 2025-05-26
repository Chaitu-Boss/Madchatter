import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('email');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = () => {
    try {
      axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            console.log("Logout successful");
            toast.success("Logged out successfully!");
            localStorage.removeItem('email');
            navigate('/login');
          } else {
            console.error("Logout failed:", response.data.message);
          }
        });
    } catch (error) {
      console.error("Logout error:", error);
      return;
    }

  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center sticky top-0 z-5">
      <Link to="/"><h1 className="text-xl font-bold">Media Pulse</h1></Link>
      <div>
        {!isLoggedIn ? (
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded text-black font-semibold hover:bg-green-600">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded text-white font-semibold hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
