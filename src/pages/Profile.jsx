import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchUserInfo, getSingleBookById } from '../apis/api.js';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await fetchUserInfo();
        if (userData) {
          const enrichedCart = await Promise.all(
            userData.cart.map(async (item) => {
              try {
                const manga = await getSingleBookById(item.manga);
                return { ...item, manga: manga.data };
              } catch {
                toast.error('Error loading cart item.');
                return item;
              }
            })
          );

          const enrichedOrders = await Promise.all(
            userData.orders.map(async (order) => {
              const enrichedItems = await Promise.all(
                order.items.map(async (item) => {
                  try {
                    const bookData = await getSingleBookById(item.bookId);
                    return { ...item, book: bookData.data };
                  } catch {
                    toast.error('Error loading order item.');
                    return item;
                  }
                })
              );
              return { ...order, items: enrichedItems };
            })
          );

          setUser({ ...userData, orders: enrichedOrders });
          setCartItems(enrichedCart);
        }
      } catch {
        toast.error('Failed to load profile.');
      }
    };

    getProfile();
  }, []);

  if (!user) return <p className="text-center mt-20 text-lg">Loading profile...</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 mt-10 mb-20"
    >
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <motion.img 
          src={user.avatar} 
          alt="avatar" 
          className="w-40 h-40 object-cover rounded-full border-4 border-pink-400 shadow-xl"
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

      {/* Orders */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Your Orders ({user.orders?.length || 0})
        </h2>

        {user.orders?.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {user.orders.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-gray-200 p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs text-gray-600">
                    🧾 Payment ID: {order.paymentIntentId}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    🕒 {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition"
                    >
                      <img
                        src={item.book?.coverImage || 'https://placehold.co/60x90'}
                        alt={item.book?.title || 'Book'}
                        className="w-16 h-24 object-cover rounded-lg border"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {item.book?.title || 'Unknown Title'}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity} | Price: ₹{item.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-right">
                  <p className="text-lg font-bold text-green-700">
                    Total: ₹{order.amount}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Cart ({cartItems.length} items)</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <motion.div 
                key={item._id} 
                className="p-4 border rounded-xl bg-gray-50 hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <img 
                    src={item.manga?.coverImage || 'https://placehold.co/100x150'} 
                    alt={item.manga?.title || 'Cover'} 
                    className="w-16 h-24 object-cover rounded" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.manga?.title || 'Unknown Title'}</h3>
                    <p className="text-sm text-gray-500">{item.manga?.language || 'N/A'}</p>
                    <p className="text-sm text-gray-600 mt-2">Price: ₹{item.manga?.price || 0}</p>
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