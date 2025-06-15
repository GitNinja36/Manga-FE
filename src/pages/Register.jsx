import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heroImg from '../assets/register-hero.jpg';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mangaZone');

    try {
      setUploading(true);
      const res = await axios.post('https://api.cloudinary.com/v1_1/davtv5r1c/upload', formData);
      setAvatarUrl(res.data.secure_url);
      toast.success('Avatar uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!avatarUrl) return toast.error('Please upload your avatar.');

    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: avatarUrl,
      address: data.address,
    };

    try {
      const res = await axios.post('http://localhost:8080/v1/user/signUp', payload);
      toast.success('Registered Successfully!');
      reset();
      setTimeout(() => navigate('/signin'), 1000);
    } catch (err) {
      toast.error('Registration failed!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-purple-200 p-4"
    >
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden max-w-5xl w-full">
        {/* Left side form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
          <p className="text-sm text-gray-500 mb-6">Join the manga marketplace!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Username</label>
              <input {...register('username', { required: true })} className="input w-full" />
              {errors.username && <p className="text-red-500 text-xs">Username is required</p>}
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input type="email" {...register('email', { required: true })} className="input w-full" />
              {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input type="password" {...register('password', { required: true })} className="input w-full" />
              {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
            </div>

            <div>
              <label className="text-sm font-semibold">Address</label>
              <input {...register('address', { required: true })} className="input w-full" />
              {errors.address && <p className="text-red-500 text-xs">Address is required</p>}
            </div>

            <div>
              <label className="text-sm font-semibold">Avatar Upload</label>
              <input type="file" onChange={handleAvatarUpload} className="input w-full" />
              {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
              {avatarUrl && <img src={avatarUrl} alt="avatar preview" className="w-20 h-20 mt-2 rounded-full border object-cover" />}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded-xl mt-4 shadow-md"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Already have an account? <a href="/signin" className="text-purple-600 hover:underline">Login</a>
          </p>
        </div>

        {/* Right side illustration */}
        <motion.div
          className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-300 to-purple-600 items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={heroImg} alt="illustration" className="w-3/4 h-auto drop-shadow-xl scale-105" />
        </motion.div>
      </div>

      <ToastContainer />
    </motion.div>
  );
};

export default Register;