import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({data}) => {
  console.log('full data', data);
  const {price,courseName,imgurl,
instructorEmail,instructorname,
courseId } = data
  
  const {user} = useContext(AuthContext)
  const [cardError,setCardError] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const [axiosSecure] = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (data && price ) {
      axiosSecure.post("/create-payment-intent", {price}).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
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
    
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log('error', error.message);
      setCardError(error.message)
    }
    else {
      setCardError('')
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log('payment intent', paymentIntent);
    setProcessing(false)
    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        email: user?.email,
        name: user?.name,
        transactionId: paymentIntent.id,
        price,
        courseName,
        imgurl,
        instructorEmail,
        instructorname,
        courseId,
        paymentMethod: paymentIntent.payment_method_types[0],
        created: paymentIntent.created,
      };
      axiosSecure.post("/PaymentInfo", paymentInfo)
        .then(res => {
          if (res.data.insertedId) {
            console.log(res.data);
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Payment Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/myselectedclasses");
          }
      })
      

    }
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
          disabled={!stripe || !clientSecret || processing}
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