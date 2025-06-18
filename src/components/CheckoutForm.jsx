import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { processPayment, placeOrder, placeDirectOrder } from '../apis/api.js';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Get parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const isDirectBuy = searchParams.get('directBuy') === 'true';
  const mangaId = searchParams.get('mangaId');
  const qty = parseInt(searchParams.get('qty')) || 1;
  const amount = parseInt(searchParams.get('amount')) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const result = await processPayment(amount, stripe, cardElement);

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-all duration-300 w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;