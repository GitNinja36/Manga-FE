import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserInfo } from '../../apis/api.js';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Book", link: "/all-books" },
    { title: "Random", link: "/random" },
    { title: "Sell", link: "/sell" },
  ];

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUserInfo();
      setUser(userInfo);
    };
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-black text-white px-4 md:px-10 py-3 shadow-md border border-gray-700 rounded-3xl m-4"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
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

        {/* Nav Links */}
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

        {/* Right - Cart & Avatar */}
        <div className="flex items-center gap-6 relative">
          <Link to="/cart">
            <FaShoppingCart className="text-2xl hover:text-pink-400 transition-colors duration-200" />
          </Link>

          {/* Avatar */}
          <button onClick={toggleDropdown} className="relative">
            <img
              src={
                user?.avatar
                  ? user.avatar
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600 hover:border-pink-400 transition-all duration-200"
            />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 w-44 bg-zinc-900 border border-gray-600 text-white rounded-md shadow-lg z-50 overflow-hidden"
              >
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-zinc-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Register
                    </Link>
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