import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1';

const token = localStorage.getItem('token');

//  Get all reviews (used in Testimonials)
export const getAllReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/review/all`);
    return res.data || [];
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
};

//  Get featured mangas (limit = 8)
export const getFeaturedMangas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/book/all?limit=8`);
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching featured mangas:', error);
    return [];
  }
};

// Get trending mangas (page 2, limit 6)
export const getTrendingMangas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/book/all?page=2&limit=6`);
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching trending mangas:', error);
    return [];
  }
};

// Get books for category section (page 1, limit 12)
export const getBooksForCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/book/all?page=1&limit=12`);
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching books for categories:', error);
    return [];
  }
};

// Get paginated books
export const getAllBooksPaginated = async ({ page = 1, limit = 12, search = '', genre = '' }) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);

    const res = await axios.get(`${BASE_URL}/book/all?${params.toString()}`);
    console.log(res.data);
    return {
      data: res.data?.data || [],
      total: res.data?.totalItems || 0,
      totalPages: res.data?.totalPages || 1,
    };
  } catch (error) {
    console.error('Error fetching books with pagination:', error);
    return { data: [], total: 0 };
  }
};

//get randome manga
export const getRandomBook = async () => {
  const res = await axios.get(`${BASE_URL}/random`);
  return res.data;
};

//upload on cloudinary
export const uploadToCloudinary = async (file) => {
  try {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mangaZone');

    const res = await axios.post('https://api.cloudinary.com/v1_1/davtv5r1c/upload', data);
    return res.data.secure_url;
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    throw err;
  }
};

// Upload manga to backend
export const uploadBook = async (bookData) => {
  try {
    const res = await axios.post('http://localhost:8080/v1/book/add', bookData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        id: localStorage.getItem('userId'),
      },
    });
    return res.data;
  } catch (err) {
    console.error('Book upload failed:', err);
    throw err;
  }
};