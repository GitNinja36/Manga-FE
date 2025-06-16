import React, { useEffect, useState } from 'react';
import { getBooksForCategories } from '../../apis/api.js';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate(); 
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getBooksForCategories();
      setBooks(data);
      const allGenres = data.flatMap(book => book.genre || []);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
      setLoading(false);
    })();
  }, []);

  const topFive = ['One Piece', 'Naruto', 'One Punch Man', 'Fire Force', 'Solo Leveling'];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 text-gray-500 text-lg">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="px-4 md:px-10 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Latest Episodes */}
        <div className="lg:col-span-9">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Episode
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {books.map((book, idx) => (
              <motion.div
                key={book._id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }} 
                onClick={() => navigate(`/manga/${book._id}`)}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{book.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-10">
          {/* Genres */}
          <h3 className="text-2xl font-bold mb-4 mt-2 text-gray-800">Genres</h3>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex flex-wrap gap-3">
              {genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-indigo-200 transition"
                >
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Top 5 */}
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Top 5</h3>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow p-4"
          >
            <ul className="space-y-3">
              {topFive.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories;