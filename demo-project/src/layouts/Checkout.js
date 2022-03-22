import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Cart from '../Views/Cart/Cart'
import StripeContainer from '../Stripe/StripeContainer'
import UserNavbar from '../components/Navbars/UserNavbar'

const Checkout = () => {
    return (
        <>
            <UserNavbar />
            <div className='d-flex '>
                <div className="container w-100 px-0">
                    <div className="row justify-content-center align-items-center">
                        <Switch>
                            <Route exact path="/checkout/cart-summary" component={Cart} />
                            <Route exact path="/checkout/payment" component={StripeContainer}/>
                            <Redirect from="*" to="/auth/login" />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout