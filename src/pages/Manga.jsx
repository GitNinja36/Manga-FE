import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { getSingleBookById, getReviewsByBookId, getToken, getUserId, submitReview } from '../apis/api.js';

const MangaPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


const StarRating = ({ rating, onRate }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl"
          onClick={() => onRate(star)}
        >
          <FaStar
            className={`cursor-pointer transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-500'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const handleReviewSubmit = async () => {
  if (!reviewRating || !reviewComment) {
    return toast.error('Please add both rating and comment');
  }

  setIsSubmitting(true);
  toast.loading('Submitting your review...');

  try {
    await submitReview({
      mangaId: book._id,
      rating: reviewRating,
      comment: reviewComment,
    });

    toast.dismiss();
    toast.success('Review submitted successfully!');
    setReviewRating(0);
    setReviewComment('');
  } catch (error) {
    toast.dismiss();
    toast.error('Failed to submit review');
    console.error('Review submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleBookById(id);
        const bookData = res.data;
        const allImages = [
          bookData.coverImage,
          ...(bookData.images || []),
          ...(bookData.additionalImages || []),
        ];
        setBook({ ...bookData, allImages });
        setSelectedImage(bookData.coverImage);

        const headers = {
          Authorization: `Bearer ${getToken()}`,
          id: getUserId(),
        };
        const reviewData = await getReviewsByBookId(id, headers);
        setReviews(reviewData);
      } catch (err) {
        console.error('Failed to fetch book or reviews', err);
      }
    };

    fetchData();
  }, [id]);

  const getEstimatedDeliveryRange = () => {
    const today = new Date();
    const minDate = new Date(today);
    const maxDate = new Date(today);
  
    minDate.setDate(today.getDate() + 4);
    maxDate.setDate(today.getDate() + 7);
  
    const options = { month: 'short', day: 'numeric' };
    return `${minDate.toLocaleDateString('en-US', options)} - ${maxDate.toLocaleDateString('en-US', options)}`;
  };
  
  const estimatedDelivery = getEstimatedDeliveryRange();

  if (!book) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <section className="bg-zinc-900 text-white px-6 py-10 md:px-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sticky Left Side - Image section */}
        <div className="lg:w-1/2 sticky top-20">
          <motion.img
            src={selectedImage}
            alt="Manga Cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-[700px] object-fill rounded-xl shadow-lg mb-4"
          />
          <div className="flex gap-2 overflow-x-auto">
            {book.allImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`img${index}`}
              className={`w-25 h-40 rounded-md object-fill border-2 cursor-pointer transition-all duration-300 ${
                selectedImage === img ? 'border-pink-500 scale-105' : 'border-transparent'
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedImage(img)}
            />
            ))}
          </div>
        </div>

        {/* Right Side - Book Info */}
        <div className="lg:w-1/2 space-y-5">
          <h1 className="text-2xl md:text-3xl font-semibold text-pink-500">{book.title}</h1>
          <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-xl ">
            <span className="line-through text-gray-400">
            Rs.{' '}
            {typeof book.price === 'number'
            ? book.price.toFixed(2)
            : 'N/A'}
            </span>
            {' '}
            <span className="text-pink-500 pl-4 ">
            Sale: Rs.{' '}
            {(() => {
            const price = book.price;
            const discount = typeof book.discountPrice === 'number'
            ? book.discountPrice
            : (price * 0.9);
            return discount.toFixed(2);
            })()}{' '}
            (
            {(() => {
            const price = book.price;
            const discount = typeof book.discountPrice === 'number'
            ? book.discountPrice
            : (price * 0.9);
            const percent = ((price - discount) / price) * 100;
            return Math.floor(percent);
            })()}
            % OFF)
            </span>
            </p>
            <p className="text-sm text-gray-400 mt-2">Taxes included. Free Shipping Over Rs 499</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex border border-gray-500 rounded-md overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1">-</button>
              <span className="px-4 py-1">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1">+</button>
            </div>
          </div>

          {/* buy and add to cart button*/}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all">Add to Cart</button>
            <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition-all">Buy Now</button>
          </div>

          {/* Highlights */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
            <p>🚚 Estimated Delivery <span className="text-pink-500 font-semibold">{estimatedDelivery}</span></p>
            <p>✅ Free shipping on all orders over Rs 499</p>
            <p>🔄 3 Days Easy Replacement</p>
            <p>💳 Cash On Delivery Available</p>
            <p>🔒 100% Secure Payments via Razorpay</p>
          </div>

          {/* add review */}
          <div className='bg-gray-800 rounded-lg p-4 space-y-4 text-sm '>
            <p className="text-base font-medium">Add a Review</p>
            <div className="flex items-center gap-2">
              <StarRating rating={reviewRating} onRate={setReviewRating} />
              <span className="text-sm text-gray-400">({reviewRating}/5)</span>
            </div>
            <textarea
              placeholder="Write your thoughts..."
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 resize-none"
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
            <button
            onClick={handleReviewSubmit}
            className={`px-4 py-2 rounded text-white text-sm transition ${
              isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
            }`}
            disabled={isSubmitting}
            >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <motion.div
        className="mt-14 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-3 text-pink-500">Description</h2>
        <p className="text-gray-300 leading-relaxed">{book.description}</p>
      </motion.div>

      {/* Customer Reviews Section Placeholder */}
      <div className="mt-10">
            <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="bg-zinc-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <img src={r.user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <p className="font-medium">{r.user.username}</p>
                      <div className="flex text-yellow-400">
                        {Array(r.rating)
                          .fill()
                          .map((_, i) => (
                            <FaStar key={i} />
                          ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-300">{r.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-gray-400">No reviews yet for this manga.</p>
              )}
            </div>
      </div>

      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </section>
  );
};

export default MangaPage;