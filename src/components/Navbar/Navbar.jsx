import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Book", link: "/all-books" },
    { title: "Randome", link: "/random" },
    { title: "Sell", link: "/sell" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-black text-white px-4 md:px-10 py-3 shadow-md border border-gray-700 rounded-3xl m-4"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left - Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-semibold font-handwriting text-white tracking-wide">
            MnagaVerse
          </h1>
        </Link>

        {/* Center - Nav Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium tracking-wide">
          {links.map(({ title, link }, i) => (
            <Link
              key={i}
              to={link}
              className="hover:text-pink-400 transition-all duration-200"
            >
              {title}
            </Link>
          ))}
        </div>

        {/* Right - Icons & Dropdown */}
        <div className="flex items-center gap-6 relative">
          <Link to="/cart">
            <FaShoppingCart className="text-2xl hover:text-pink-400 transition-colors duration-200" />
          </Link>

          <button onClick={toggleDropdown}>
            <FaUserCircle className="text-3xl hover:text-pink-400 transition-colors duration-200" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 w-44 bg-zinc-900 border border-gray-600 text-white rounded-md shadow-lg z-50 overflow-hidden"
              >
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-zinc-800"
                    >
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;