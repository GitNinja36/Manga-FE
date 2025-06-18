import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  fetchCartItems,
  updateCartQuantity,
  clearCart,
} from '../apis/api.js'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const getDiscountedPrice = (price) => Math.floor(price * 0.9);

  const fetchCart = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
      const newTotal = items.reduce(
        (sum, item) => sum + getDiscountedPrice(item?.manga?.price || 369) * item.quantity,
        0
      );
      setTotal(newTotal);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const handleQuantityChange = async (mangaId, type) => {
    try {
      await updateCartQuantity(mangaId, type);
      toast.success(`Item quantity ${type === 'inc' ? 'increased' : 'decreased'}`);
      fetchCart();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(cartItems);
      toast.success("Cart cleared");
      fetchCart();
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const handleBuyNow = () => {
    if (total <= 0 || cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    navigate(`/checkout?amount=${total}`);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cartItems.length > 0 && (
          <button onClick={handleClearCart} className="text-red-500 font-semibold hover:underline">Remove All</button>
        )}
      </div>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center mt-16"
          >
            <img src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=" alt="Empty Cart" className="mx-auto w-64" />
            <p className="text-xl font-medium text-gray-600 mt-4">Your cart is empty</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.manga._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white shadow-xl rounded-2xl p-5 flex items-center justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img src={item.manga.coverImage || "/book.jpg"} alt="cover" className="w-20 h-24 rounded-xl object-cover" />
                  <div>
                    <h2 className="font-semibold text-lg">{item.manga.title}</h2>
                    <p className="text-gray-500 line-through">Rs {item.manga.price}</p>
                    <p className="text-red-600 font-bold">
                      Rs {getDiscountedPrice(item.manga.price)} <span className="text-sm font-normal">10% off</span>
                    </p>
                    <div className="flex items-center mt-2 border w-max rounded-lg overflow-hidden">
                      <button onClick={() => handleQuantityChange(item.manga._id, 'dec')} className="px-3 py-1 text-lg">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.manga._id, 'inc')} className="px-3 py-1 text-lg">+</button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold">Rs {getDiscountedPrice(item.manga.price) * item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {cartItems.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Estimate Total: Rs {total}</h3>
          </div>
          <button
            onClick={handleBuyNow}
            className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-6 rounded-xl shadow-md transition-all duration-300"
            >
            Buy Now
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;