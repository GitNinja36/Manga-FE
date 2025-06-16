import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllBooksPaginated } from '../apis/api.js';
import { useNavigate } from 'react-router-dom';

const genresList = [
  'Action', 'Kids', 'Comedy', 'Fantasy', 'Game',
  'Martial Arts', 'Adventure', 'Mystery',
];

const AllBooks = () => {
  const navigate = useNavigate(); 
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [activeFilter, setActiveFilter] = useState('latest');

  const fetchBooks = async () => {
    try {
      const res = await getAllBooksPaginated({ page, limit: 12, search: searchTerm, genre });
      console.log("Fetched Books:", res);
      setBooks(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, genre, searchTerm]);

  const handleFilterClick = (type) => {
    setActiveFilter(type);
    setPage(1);
    setGenre('');
    setSearchTerm('');
  };

  const handleGenreClick = (genre) => {
    setGenre(genre);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <section className="bg-zinc-900 text-white px-4 py-10 md:px-10">
      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {['Latest', 'Trending', 'Popular'].map((label) => (
          <button
            key={label}
            onClick={() => handleFilterClick(label.toLowerCase())}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              activeFilter === label.toLowerCase()
                ? 'bg-pink-600 text-white'
                : 'bg-gray-800 hover:bg-pink-500 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="ml-auto">
          <motion.input
            type="text"
            name="search"
            placeholder="Search"
            className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 w-52"
            whileFocus={{ scale: 1.05 }}
          />
        </form>
      </div>

      {/* Main Content Grid */}
      <div className="flex">
        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <motion.div
                key={book._id}
                onClick={() => navigate(`/manga/${book._id}`)}
                className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-white truncate">{book.title}</h3>
              </motion.div>
            ))
          ) : (
            <p className="text-white col-span-full">No books found.</p>
          )}
        </div>

        {/* Genres */}
        <div className="ml-6 hidden lg:block">
          <h3 className="mb-4 font-bold text-white text-lg">Genres</h3>
          <div className="space-y-2">
            {genresList.map((g) => (
              <button
                key={g}
                onClick={() => handleGenreClick(g)}
                className="block px-3 py-2 rounded-md bg-gray-800 hover:bg-pink-600 hover:text-white transition duration-300 w-full text-left truncate"
              >
                {g.length > 8 ? `${g.slice(0, 7)}...` : g}
              </button>
            ))}
            <div className="text-center pt-2">
              <button className="text-gray-400 hover:text-white">▼</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-2 bg-gray-700 rounded hover:bg-pink-600 transition"
          disabled={page === 1}
        >
          &lt;
        </button>
        <div className="px-4 py-2 bg-pink-600 rounded text-white">{page}</div>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-2 bg-gray-700 rounded hover:bg-pink-600 transition"
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default AllBooks;