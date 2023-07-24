import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

const StripeContainer = ({discountedTotalPrice}) => {
    const PUBLIC_KEY = "pk_test_51NWrlISAWcx847YZWCsNF4FCswHJTiUwqxApCAiGNUNxQFv1UBIYLZO3pqPoVOKNbkY8xmVuybi38VkwpIaDcPtf00ft7p8qjz"
    const stripTestPromise =loadStripe(PUBLIC_KEY)
  return (
    <Elements stripe={stripTestPromise}>
<PaymentForm discountedTotalPrice={discountedTotalPrice}/>
    </Elements>
  )
}

export default StripeContainer