import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ADJUST_QTY, DECREEMENT_QTY, INCREEMENT_QTY, REMOVE_FROM_CART } from '../../redux/actions/actions'

const Cart = ({props}) => {
    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.cart)
    const [subTotal, setSubtotal] = useState()

    useEffect(() => {
        let price = 0
        cartData.forEach(item => {
            price += item.qty * item.price
        });

        setSubtotal(price)
    }, [cartData, subTotal, setSubtotal])

    return (
        <div className='main-content h-100 bg-light p-3 pb-5'>
            <div className='d-flex align-items-center justify-content-between border-bottom py-1'>
                <h4 className='text-dark'>Shopping Cart</h4>
                <Link to='/product/Viewproduct'>
                    <button className='btn bg-primary-icon text-light'>Back</button>
                </Link>
            </div>
            {cartData && cartData.length > 0 ?
                <div className='cart-view my-4 '>
                    <div className='table-responsive'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Total</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {cartData.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td><img crossOrigin='anonymous' className='cart-img' src={process.env.REACT_APP_IMAGE_URL + item.image} /></td>
                                        <td>{item.productName}</td>
                                        <td>Rs. {item.price}</td>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                {item.qty}
                                                <div className='d-flex flex-column'>
                                                    <button className='btn btn-link' onClick={() => dispatch(INCREEMENT_QTY(item.id))}><i className="uil uil-angle-up"></i></button>
                                                    <button className='btn btn-link' onClick={() => dispatch(DECREEMENT_QTY(item.id))}><i className="uil uil-angle-down"></i></button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Rs. {item.qty * item.price}</td>
                                        <td><button onClick={() => dispatch(REMOVE_FROM_CART(item.id))} className='btn btn-link'><i className="uil uil-multiply"></i></button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>

                    <div className='subtotal d-flex flex-column'>
                        <div className='ms-auto me-4 text-right'>
                            <p className='m-0'>Subtotal: Rs. {subTotal}</p>
                            <p className='m-0'>Shipping Charges: Rs. 0.00</p>
                            <p className='m-0'>Sales Tax: Rs. 0.00</p>
                            <h4>Total Amount: Rs. {subTotal}</h4>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Link to="/product/Viewproduct"><button className='btn btn-primary me-2'>Continue Shopping</button></Link>
                        <Link to="/checkout/payment"><button className='btn btn-success'>Place Order</button></Link>
                    </div>
                </div>
                :
                <div className='d-flex flex-column align-items-center mt-5'>
                    <img src={
                        require("../../assets/images/shopping-bag.jpg")
                    } className="shopping-bag-img" alt="..."></img>
                    <div className='my-4 text-center'>
                        <h5>Hey, it feels so light!</h5>
                        <p className='text-muted'>There is nothing in your bag. Let's add some items.</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Cart