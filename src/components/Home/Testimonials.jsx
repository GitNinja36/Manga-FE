import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../../apis/api.js'
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    const data = await getAllReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        No testimonials yet.
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Readers Say
        </motion.h2>

        <div className="overflow-x-auto scrollbar-hide">
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={review._id}
                className="min-w-[280px] max-w-[320px] bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.user.avatar}
                    alt={review.user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{review.user.username}</h4>
                    <div className="text-yellow-400 text-sm">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  “{review.comment}”
                </p>
                {review?.manga?.title && (
                  <p className="text-xs text-pink-400 italic mt-2">
                    — On <span className="font-medium">{review.manga.title}</span>
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;