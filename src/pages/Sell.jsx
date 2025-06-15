import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { uploadToCloudinary, uploadBook } from '../apis/api.js';

const genreOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Kids', label: 'Kids' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Game', label: 'Game' },
  { value: 'Martial Arts', label: 'Martial Arts' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Mystery', label: 'Mystery' },
];

const Sell = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadFiles, setUploadFiles] = useState({ file: null });
  const [imageFiles, setImageFiles] = useState({
    coverImage: null,
    image1: null,
    image2: null,
    image3: null
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleImagePreview = (type) => {
    if (imageFiles[type]) {
      setPreviewImage(URL.createObjectURL(imageFiles[type]));
    } else {
      setPreviewImage('https://via.placeholder.com/200?text=No+Image');
    }
  };

  const onSubmit = async (data) => {
    if (!uploadFiles.file || Object.values(imageFiles).some((f) => !f)) {
      toast.error('Please upload all images and the main file.');
      return;
    }

    try {
      toast.info('Uploading files...');
      const [url, coverImage, image1, image2, image3] = await Promise.all([
        uploadToCloudinary(uploadFiles.file),
        uploadToCloudinary(imageFiles.coverImage),
        uploadToCloudinary(imageFiles.image1),
        uploadToCloudinary(imageFiles.image2),
        uploadToCloudinary(imageFiles.image3),
      ]);

      const body = {
        url,
        title: data.title,
        description: data.description,
        author: data.author,
        language: data.language,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        coverImage,
        images: [image1, image2, image3],
        genre: selectedGenres.map((g) => g.value),
      };
      await uploadBook(body);

      toast.success('Book uploaded successfully!');
      reset();
      setUploadFiles({ file: null });
      setImageFiles({ coverImage: null, image1: null, image2: null, image3: null });
      setSelectedGenres([]);
      setPreviewImage('');
    } catch (err) {
      toast.error('Upload failed!');
    }
  };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Sell Your Manga</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <label className="col-span-1">Name
          <input {...register('author', { required: true })} className="input" />
          {errors.author && <p className="text-red-500 text-sm">Required</p>}
        </label>

        <label className="col-span-1">Title
          <input {...register('title', { required: true })} className="input" />
          {errors.title && <p className="text-red-500 text-sm">Required</p>}
        </label>

        <label className="col-span-2">Description
          <textarea {...register('description', { required: true })} className="input h-24" />
          {errors.description && <p className="text-red-500 text-sm">Required</p>}
        </label>

        <label className="col-span-1">Genre
          <Select isMulti options={genreOptions} value={selectedGenres} onChange={setSelectedGenres} />
        </label>

        <label className="col-span-1">Language
          <input {...register('language', { required: true })} className="input" />
          {errors.language && <p className="text-red-500 text-sm">Required</p>}
        </label>

        <label className="col-span-1">Price
          <input type="number" {...register('price', { required: true })} className="input" />
          {errors.price && <p className="text-red-500 text-sm">Required</p>}
        </label>

        <label className="col-span-1">Stock
          <input type="number" {...register('stock', { required: true })} className="input" />
          {errors.stock && <p className="text-red-500 text-sm">Required</p>}
        </label>

        {['coverImage', 'image1', 'image2', 'image3'].map((img, idx) => (
          <label key={img} className="col-span-2 md:col-span-1">
            {img === 'coverImage' ? 'Cover Image' : `Image ${idx}`}
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={(e) => setImageFiles({ ...imageFiles, [img]: e.target.files[0] })}
            />
          </label>
        ))}

        <label className="col-span-2">Upload Manga File (PDF)
          <input type="file" accept="application/pdf" onChange={(e) => setUploadFiles({ file: e.target.files[0] })} className="input" />
        </label>

        <div className="col-span-2 flex gap-2 justify-end">
          {['coverImage', 'image1', 'image2', 'image3'].map((type, i) => (
            <button
              type="button"
              key={type}
              className="btn"
              onClick={() => handleImagePreview(type)}
            >
              {type === 'coverImage' ? 'Cover' : `Image ${i}`}
            </button>
          ))}
        </div>

        <div className="col-span-2 mx-auto mt-2">
          <motion.img
            src={previewImage || 'https://via.placeholder.com/200?text=Preview'}
            alt="Preview"
            className="w-64 h-64 object-contain border"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <button type="submit" className="btn-submit col-span-2 mx-auto mt-4">
          Upload Book
        </button>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default Sell;