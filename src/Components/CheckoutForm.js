import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order }) => {

    // console.log(order, 'CheckoutForm');
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transaction, setTransaction] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { Price, name, email, _id } = order;
    // console.log('order id:', _id);



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://ass-backend-12-copy.onrender.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Price }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("client secret", data.clientSecret);
                return setClientSecret(data.clientSecret)
            });
    }, [Price]);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log('handleSubmin');

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('Card error', error);
            setCardError(error.message);
        } else {
            setCardError('')
        }

        setSuccess('');
        setProcessing(true);

        const { paymentIntent, error: ConfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (ConfirmError) {
            setCardError(ConfirmError.message);
            return
        }

        if (paymentIntent.status === "succeeded") {

            console.log('card', card);

            const payment = {
                name,
                email,
                transactionId: paymentIntent.id,
                bookId: _id
            }

            fetch("https://ass-backend-12-copy.onrender.com/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('pyment', data);
                    if (data.insertedId) {
                        setSuccess('Congratulatio! Your payment completed.');
                        setTransaction(paymentIntent.id);
                        toast.success('Congratulatio! Your payment completed.');
                        navigate("/dashboard/order");
                        // <Navigate to="/dashboard/order" replace={true} />
                    }
                })

        }

        setProcessing(false);
        // console.log('test', paymentIntent);
        // console.log('Client scrit', clientSecret);

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500 px-2'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Transaction-Id : <span className='font-bold'>{transaction}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;