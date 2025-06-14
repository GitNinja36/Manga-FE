import React, { useEffect, useState } from 'react';
import { getFeaturedMangas } from '../../apis/api.js';
import { motion } from 'framer-motion';

const FeaturedManga = () => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      const data = await getFeaturedMangas();
      setMangas(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading featured manga...
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-start mb-10 text-gray-800"
        >
          Popular Mangas 
        </motion.h2>

        <div className="overflow-x-auto scrollbar-hide py-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 px-2 md:px-4"
          >
          {mangas.map((manga, idx) => (
            <motion.div
              key={manga._id || idx}
              className="min-w-[250px] max-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="h-60 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{manga.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{manga.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-indigo-600 font-semibold">₹{manga.price}</span>
              <button className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                View
              </button>
            </div>
            </div>
            </motion.div>
            ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedManga;