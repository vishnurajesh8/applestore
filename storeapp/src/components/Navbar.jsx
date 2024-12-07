import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-white">
          <span className="text-emerald-500">Apple</span> Store
        </div>

        {/* Menu Section */}
        <div className="hidden md:flex space-x-8">
          <Link to={'/'} className="hover:text-emerald-500 transition duration-300">Home</Link>
          <Link to={'/shop'} className="hover:text-emerald-500 transition duration-300">Shop</Link>
          <Link to={'/about'} className="hover:text-emerald-500 transition duration-300">About Us</Link>
          <Link to={'/contact'} className="hover:text-emerald-500 transition duration-300">Contact</Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-6">
          <Link to={'/login'} className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-md transition duration-300">
            Login
          </Link>
          <Link to={'/cart'} className="bg-transparent border-2 border-emerald-500 hover:bg-emerald-500 text-white py-2 px-4 rounded-md transition duration-300">
            Cart
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button className="text-white text-2xl">
            <i className="fas fa-bars"></i> {/* You can use a hamburger icon here */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
