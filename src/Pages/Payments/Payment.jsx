import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {  useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import Loading from '../../Shared Component/Loading';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gatway_PK);
const Payment = () => {
  const [axiosSecure] = useAxiosSecure()
  const {id} = useParams()
  const {data} = useQuery({
    queryKey: ['classInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getclassInfo/${id}`)
      return res.data
    }
  })

  if (!data) {
    return <Loading></Loading>
  }
  
  return (
    <div>
      payment
      <Elements stripe={stripePromise}>
        <CheckoutForm data={data}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;