import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080/v1';

const Profile = () => {
  const [user, setUser] = useState(null);

  const getToken = () => localStorage.getItem('token');
  const getUserId = () => localStorage.getItem('userId');

  const fetchUserData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${getToken()}`,
        id: getUserId(),
      };
      const res = await axios.get(`${BASE_URL}/user/info`, { headers });
      setUser(res.data);
    } catch (err) {
      toast.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) return <p className="text-center mt-20 text-lg">Loading profile...</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 mt-10 mb-20"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <motion.img 
          src={user.avatar} 
          alt="avatar" 
          className="w-40 h-40 object-cover rounded-full border-4 border-pink-400 shadow-lg"
          whileHover={{ scale: 1.05 }}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-lg text-gray-600">{user.email}</p>
          <span className="inline-block mt-2 px-4 py-1 text-sm bg-pink-100 text-pink-600 rounded-full capitalize">
            Role: {user.role}
          </span>
          <p className="mt-4 text-sm text-gray-400">Joined on {new Date(user.createdAt).toDateString()}</p>
        </div>
      </div>

      {/* Cart Info */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Cart ({user.cart.length} items)</h2>
        {user.cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.cart.map((book) => (
              <motion.div 
                key={book._id} 
                className="p-4 border rounded-xl bg-gray-50 hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <img src={book.coverImage} alt={book.title} className="w-16 h-24 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.language || 'N/A'}</p>
                    <p className="text-sm text-gray-600 mt-2">Price: Rs {book.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;