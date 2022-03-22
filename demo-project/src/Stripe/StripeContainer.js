import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51Kb1FiSDymyE7YWp8yYUqGwByvMV0eTk1TW7J7cB51v1t6STRVzWNibqfQMm275qbu2fJV83ypX0EBtzbnortWXP00fnPAzgRL"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm />
    </Elements>
  )
}

export default StripeContainer