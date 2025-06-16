import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_your_publishable_key');

const CheckoutPage = () => {
  const totalAmount = 500;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;