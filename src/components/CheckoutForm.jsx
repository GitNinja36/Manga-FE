import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createPaymentIntent } from '../apis/api.js';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clientSecret = await createPaymentIntent(totalAmount);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      toast.error('Something went wrong during payment.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-all duration-300 w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;