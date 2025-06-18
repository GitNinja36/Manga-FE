import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  processPayment,
  placeOrder,
  placeDirectOrder,
} from '../apis/api.js';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const isDirectBuy = searchParams.get('directBuy') === 'true';
  const mangaId = searchParams.get('mangaId');
  const qty = parseInt(searchParams.get('qty')) || 1;
  const amount = parseInt(searchParams.get('amount')) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCardError('');

    try {
      const cardElement = elements.getElement(CardElement);
      const result = await processPayment(amount, stripe, cardElement);

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        let response;
        if (isDirectBuy && mangaId) {
          response = await placeDirectOrder(
            amount,
            result.paymentIntent.id,
            mangaId,
            qty
          );
        } else {
          response = await placeOrder(amount, result.paymentIntent.id);
        }
        console.log("Order Response:", response);
        navigate('/');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      toast.error('Something went wrong during payment.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-12 pb-28 bg-gradient-to-tr from-zinc-100 to-zinc-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg border border-zinc-200 rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-zinc-800 text-center">
          Secure Payment
        </h2>

        <div className="space-y-2">
          <label htmlFor="card-element" className="text-sm font-medium text-zinc-700">
            Card Information
          </label>
          <div className="p-3 rounded border border-zinc-300 shadow-sm focus-within:border-pink-400">
            <CardElement
              id="card-element"
              className="text-md text-zinc-800"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1a1a1a',
                    '::placeholder': {
                      color: '#a0aec0',
                    },
                  },
                  invalid: {
                    color: '#e53e3e',
                  },
                },
              }}
            />
          </div>
          {cardError && (
            <p className="text-red-500 text-sm mt-1">{cardError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ₹${amount}`
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;