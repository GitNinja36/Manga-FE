import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const token = localStorage.getItem('token');
export const getToken = () => localStorage.getItem('token');
export const getUserId = () => localStorage.getItem('userId');

// User Sign In
export const signInUser = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/signIn`, formData);
    return res.data; // contains token, role, id
  } catch (err) {
    console.error('Login failed:', err);
    throw err;
  }
};

// Get Logged-in User Info
export const fetchUserInfo = async () => {
  const token = getToken();
  const id = getUserId();

  try {
    if (token && id) {
      const res = await axios.get(`${BASE_URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id,
        },
      });
      return res.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error fetching user info:', err);
    return null;
  }
};

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

    const res = await axios.post(CLOUDINARY_URL, data);
    return res.data.secure_url;
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    throw err;
  }
};

// Upload manga to backend
export const uploadBook = async (bookData) => {
  try {
    const res = await axios.post(`${BASE_URL}/book/add`, bookData, {
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

//get a manga 
export const getSingleBookById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single book:', error);
    throw error;
  }
};

//get review of any book
export const getReviewsByBookId = async (id, headers) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/${id}`, { headers });
    return response.data;
  }catch(err){
    console.error('Error fetching single book:', err);
    throw err;
  }
};

// Submit a review for a book
export const submitReview = async ({ mangaId, rating, comment }) => {
  const token = getToken();
  const userId = getUserId();

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      id: userId,
    };

    const body = { mangaId, rating, comment };

    const res = await axios.post(`${BASE_URL}/review/add`, body, { headers });
    return res.data;
  } catch (err) {
    console.error('Error submitting review:', err);
    throw err;
  }
};

// Fetch a random book with all images combined
export const fetchRandomBook = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/book/random`);
    const bookData = res.data;
    const allImages = [
      bookData.coverImage,
      ...(bookData.images || []),
      ...(bookData.additionalImages || []),
    ];
    return { ...bookData, allImages };
  } catch (error) {
    console.error('Error fetching random book:', error);
    throw error;
  }
};

//add to cart
export const addToCart = async (mangaId, quantity = 1) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      id: getUserId()
    };

    const body = { mangaId, quantity };
    const res = await axios.post(`${BASE_URL}/cart/add`, body, { headers });
    return res.data;
  } catch (err) {
    console.error('Error adding to cart:', err);
    throw err;
  }
};

// Get cart items
export const fetchCartItems = async () => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    id: getUserId(),
  };

  const res = await axios.get(`${BASE_URL}/cart/all`, { headers });
  const items = res.data?.data || [];
  return items;
};

// Update quantity (increase or decrease)
export const updateCartQuantity = async (mangaId, type) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    id: getUserId(),
  };

  if (type === 'inc') {
    await axios.post(`${BASE_URL}/cart/add`, { mangaId, quantity: 1 }, { headers });
  } else {
    await axios.delete(`${BASE_URL}/cart/remove`, {
      headers,
      data: { mangaId, quantity: 1 },
    });
  }
};

// Remove all items from cart
export const clearCart = async (cartItems) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    id: getUserId(),
  };

  for (const item of cartItems) {
    if (!item?.manga?._id) continue;

    console.log("Removing from cart:", item.manga._id);

    await axios.delete(`${BASE_URL}/cart/remove`, {
      headers,
      data: {
        mangaId: item.manga._id,
        quantity: item.quantity,
      },
    });
  }
};

//STRIPE: Create Payment Intent
export const createPaymentIntent = async (amount) => {
  try {
    const res = await axios.post(`${BASE_URL}/payment/create-payment-intent`, { amount });
    return res.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// STRIPE: Confirm and Process Payment
export const processPayment = async (amount, stripe, cardElement) => {
  try {
    const res = await axios.post(`${BASE_URL}/payment/create-payment-intent`, { amount });
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    return result;
  } catch (err) {
    console.error('Error during payment processing:', err);
    throw err;
  }
};

//place order 
export const placeOrder = async (amount, paymentIntentId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  const res = await axios.post(
    `${BASE_URL}/order/place-order`,
    { amount, paymentIntentId },
    { headers }
  );

  return res.data;
};

// Direct Buy Order
export const placeDirectOrder = async (amount, paymentIntentId, mangaId, qty) => {
  return await axios.post(
    `${BASE_URL}/order/direct-buy`,
    {
      directBuy: mangaId,
      qty,
      amount,
      paymentIntentId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Sign up a new user
export const signUpUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/signUp`, userData);
    return res.data;
  } catch (err) {
    console.error('Registration failed:', err);
    throw err;
  }
};

//ai
export const generateSummary = async (title, description, genre) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ai/generate-summary`, {
    title,
    description,
    genre
  });
  return res.data.summary;
};