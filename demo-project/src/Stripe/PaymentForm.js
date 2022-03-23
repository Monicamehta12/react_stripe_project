import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

const PaymentForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [subscription, setSubscription] = useState("onetime");
    const [success, setSuccess] = useState(false)
    const cartData = useSelector((state) => state.cart)
    const stripe = useStripe()
    const elements = useElements()

    console.log("cartdata", cartData)

    useEffect(() => {
        let price = 0
        cartData.forEach(item => {
            price += item.qty * item.price
        });

        setAmount(price)
    }, [cartData, amount, setAmount])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!elements || !stripe) return;
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });
            const res = await axios.post("http://localhost:8080/payment", {
                amount,
                email,
                subscription,
                paymentMethod: paymentMethod.id,
            });
            if (res.data.actionRequired) {
                // Perform 3D Secure authentication
                const { paymentIntent, error } = await stripe.confirmCardPayment(
                    res.data.clientSecret,
                    console.log("response", res.data)
                );
                if (error) return alert("Error in payment, please try again later");
                if (paymentIntent.status === "succeeded")
                    setSuccess(true)
                    return alert(`Payment successful, payment ID - ${res.data.id}`);
            } 
            // if(res){
            //     alert("waiting for payment")
            // }
            else {
                // Simple HTTP Payment was successful
                alert(`Payment successful, payment ID - ${res.data.id}`);
            }
        } catch (error) {
            console.error(error);
            alert("Payment failed!");
        }
    }


    return (
        <>
            {!success ?
                <div>
                    <form onSubmit={handleSubmit} className="my-3 d-flex flex-column">
                        <input
                            type="email"
                            value={email}
                            className="my-2 w-50 p-2"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                        {/* <input
                            type="number"
                            value={amount}
                            className="my-2 w-50 p-2"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount"
                        /> */}
                        <div className="my-2 w-50">
                            <input
                                type="radio"
                                onChange={(e) => setSubscription("onetime")}
                                checked={subscription === "onetime"}
                            />
                            Onetime
                        </div>
                        <div className="my-2 w-50">
                            <input
                                type="radio"
                                onChange={(e) => setSubscription("monthly")}
                                checked={subscription === "monthly"}
                            />
                            Monthly
                        </div>
                        <p className='mt-3'>Please Enter Card Details: </p>
                        <fieldset className='w-50 my-3'>
                            <div className='border p-2'>
                                <CardElement></CardElement>
                            </div>
                        </fieldset>
                        <button type="submit" className='btn btn-primary w-50'>Pay</button>
                    </form>
                </div>
                :
                <div className="my-4 text-center">
                    <h2 className='text-success my-3'>Payment Successful..!</h2>
                    <h2>You just bought one month subscription</h2>
                </div>

            }
        </>
    )
}

export default PaymentForm