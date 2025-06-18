import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleBookById } from '../apis/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = parseInt(queryParams.get("amount")) || 0;
  const directBuyId = queryParams.get("directBuy");

  const [directBook, setDirectBook] = useState(null);

  useEffect(() => {
    if (directBuyId) {
      getSingleBookById(directBuyId)
        .then(res => setDirectBook(res.data))
        .catch(err => console.error("Error fetching book:", err));
    }
  }, [directBuyId]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {directBook && (
        <div className="mb-6 p-4 border rounded shadow text-white bg-zinc-900">
          <h2 className="text-xl font-semibold">{directBook.title}</h2>
          <p>{directBook.description?.slice(0, 120)}...</p>
          <img src={directBook.coverImage} className="w-24 rounded mt-2" />
        </div>
      )}

      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} directBookId={directBuyId} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;