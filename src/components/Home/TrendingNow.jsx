import React, { useEffect, useState } from 'react';
import { getTrendingMangas } from '../../apis/api.js';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TrendingNow = () => {
  const navigate = useNavigate(); 
  const [trendingMangas, setTrendingMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTrendingMangas();
      setTrendingMangas(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading trending mangas...
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-start mb-10 text-gray-800 flex items-center gap-3"
        >
          Trending Now
        </motion.h2>

        <div className="overflow-x-auto scrollbar-hide py-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 px-2 md:px-4"
          >
            {trendingMangas.map((book, idx) => (
              <motion.div
                key={book._id || idx}
                className="min-w-[250px] max-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex-shrink-0 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-60 w-full object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{book.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{book.description}</p>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {book.genre?.slice(0, 2).map((genre, gIdx) => (
                      <span
                        key={gIdx}
                        className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-indigo-600 font-semibold">₹{book.price}</span>
                    <button 
                      className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                      onClick={() => navigate(`/manga/${book._id}`)}
                      >
                      View
                    </button>
                  </div>
                </div>

                {/* Trending badge */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  🔥 Trending
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;