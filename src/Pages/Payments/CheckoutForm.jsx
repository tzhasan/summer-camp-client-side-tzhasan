import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';


const CheckoutForm = ({ price }) => {
  const {user} = useContext(AuthContext)
  const [cardError,setCardError] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const [axiosSecure] = useAxiosSecure()
  const [clientSecret,setClientSecret] = useState('')

  useEffect(() => {
    axiosSecure.post("/create-payment-intent",price)
      .then(res => {
      setClientSecret(res.data.clientSecret)
    })
  },[price])



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log('error', error.message);
      setCardError(error.message)
    }
    else {
      console.log('payment method', paymentMethod);
      setCardError('')
    }

    // const { paymentIntent, error: confirmError } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         email: user?.email || "unknown",
    //         name: user?.displayName || "anonymous",
    //       },
    //     },
    //   });
    //   console.log(paymentIntent, confirmError);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {/* <button type="submit" disabled={!stripe}>
        Pay
      </button> */}
        <button
          className="btn btn-sm btn-outline btn-success"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          PAY
        </button>
      </form>
      {
        cardError && <p className='text-red-500'>{ cardError}</p>
      }
    </>
  );
};

export default CheckoutForm;