import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import heroImg from '../assets/register-hero.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/v1/user/signIn', formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('userId', res.data.id);

      toast.success("Login successful");
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error("Login failed. Please check your credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl w-[90%] md:w-[80%] lg:w-[70%] grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3">Holla, Welcome Back</h2>
          <p className="text-gray-500 mb-6">Hey, welcome back to your special place</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-xl shadow-md hover:bg-purple-700 transition"
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-sm mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-purple-400 to-purple-600 rounded-tr-3xl rounded-br-3xl">
          <img
            src={heroImg}
            alt="Secure Login"
            className="w-80 drop-shadow-2xl animate-fade-in"
          />
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;
