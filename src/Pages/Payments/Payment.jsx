import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {  useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gatway_PK);
const Payment = () => {
  const { price } = useParams()
  
  return (
    <div>
      payment
      <Elements stripe= {stripePromise}>
        <CheckoutForm price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;