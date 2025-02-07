import React from 'react';
import { Link } from 'react-router-dom';  // For routing (ensure you have react-router-dom installed)
import { FaUserPlus, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white py-1 fixed top-0 left-0 right-0 z-50">  {/* Reduced padding for thinner navbar */}
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        <div className="text-xl font-bold"> {/* Adjusted font size to make it thinner */}
          <Link to="/" className="hover:text-gray-300">MyStore</Link>
        </div>

        <div className="flex space-x-6 ml-auto">  {/* Align links to the right */}
          <Link
            to="/register"
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaUserPlus className="mr-2 text-lg text-green-500" /> {/* Smaller icon size */}
            Register
          </Link>
          <Link
            to="/login"
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaSignInAlt className="mr-2 text-lg text-red-500" /> {/* Smaller icon size */}
            Login
          </Link>
          <Link
            to="/cart"
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaShoppingCart className="mr-2 text-lg text-orange-400" /> {/* Smaller icon size */}
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
