import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



const stripePromise = loadStripe('pk_test_51LYUvnBVDibabXHisH0GvAI2H39DwKOoMLKVVVTNvqu4niaeCnMpQdJVkGQlPrOpDqjn6n6JBUpZt6tpr8swrH4u00IWn8PtCa');




function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use elements.getElement to get a reference to the CardElement
    // Use stripe.createToken or stripe.createPaymentMethod to create a payment token or payment method
    // Send the token or payment method to your Laravel backend to process the payment
  };

  return (
    <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
  );
}