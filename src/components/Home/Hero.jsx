import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-4 md:px-20 min-h-[90vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Dive into the World of <span className="text-pink-500">Manga</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Discover, collect, and relive your favorite stories. From shōnen legends to slice-of-life gems — your manga journey starts here!
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/shop">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-lg">
              Browse Manga
            </button>
          </Link>
          <Link to="/sell">
            <button className="border border-pink-500 hover:bg-pink-600 hover:text-white text-pink-500 px-6 py-3 rounded-xl transition duration-300">
              Sell Your Manga
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;