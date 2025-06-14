import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1';

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
      total: res.data?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching books with pagination:', error);
    return { data: [], total: 0 };
  }
};