import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {

    let { payId } = useParams();
    const url = `http://localhost:5000/order/${payId}`;

    const { data: order, error, isLoading } = useQuery(['order', payId], () =>
        fetch(url).then(res => res.json()
        ))

    // console.log('order data', order);

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    if (isLoading) {
        return <loading></loading>
    }
    if (error) {
        console.log('payment', error);
    }

    return (
        <div>
            <h2>Please pay for : {payId} </h2>

            <div className='w-96 py-5 '>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;