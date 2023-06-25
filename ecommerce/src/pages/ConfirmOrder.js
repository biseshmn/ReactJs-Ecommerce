import React from 'react'
import { isAuthenticated } from '../auth'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../config'

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem('cartItem'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user } = isAuthenticated()
    const totalPrice = cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0)

    const proceedToPayment = () => {
        const data = {
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }
    return (
        <>
            <div className='container my-5'>
                <div className='row mb-3'>
                    <div className='col-9'>
                        <div className='bg-info bg-gradient bg-opacity-10 rounded-3 p-3'>
                            <h3 className='text-primary mb-3'>Shipping Info</h3>

                            <div>
                                <em><b>Name</b></em>:&nbsp;
                                <span className='text-muted'>{user.name}</span>
                            </div>

                            <div>
                                <em><b>Email</b></em>:&nbsp;
                                <span className='text-muted'>{user.email}</span>
                            </div>

                            <div>
                                <em><b>City</b></em>:&nbsp;
                                <span className='text-muted'>{shippingInfo.city}</span>
                            </div>

                            <div>
                                <em><b>Phone number</b></em>:&nbsp;
                                <span className='text-muted'>{shippingInfo.phone}</span>
                            </div>

                            <div>
                                <em><b>Country</b></em>:&nbsp;
                                <span className='text-muted'>{shippingInfo.country}</span>
                            </div>

                            <div>
                                <em><b>Shipping Address</b></em>:&nbsp;
                                <span className='text-muted'>{shippingInfo.shippingAddress1}, {shippingInfo.shippingAddress2}</span>
                            </div>

                            <div>
                                <em><b>Zip</b></em>:&nbsp;
                                <span className='text-muted'>{shippingInfo.zip}</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-3 bg-info bg-gradient bg-opacity-10 rounded-3 p-3'>
                        <h3 className='text-primary'>Order Summary</h3>
                        <hr />

                        <h6>
                            <span>Sub Total: </span>

                            <span className='text-success'>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}(Units)</span>
                        </h6>

                        <h6>
                            <span>Total Price: </span>
                            <span className='text-success'>Rs. {totalPrice}</span>
                        </h6>
                        <hr />

                        <button className='btn btn-warning' onClick={proceedToPayment}>Proceed to payment</button>
                    </div>
                </div>


                <div className='d-flex flex-column gap-2 mb-3 p-3'>
                    <h3 className='text-primary'>Items in your cart</h3>
                    {
                        cartItems.map((item, i) => (
                            <>
                                <div className='row d-flex align-items-center bg-info bg-gradient bg-opacity-10'>
                                    <div className='col-3 p-2'>
                                        <img src={`${IMG_URL}/${item.image}`} alt={item.name} className="img-fluid" width="150" height="150" />
                                    </div>

                                    <div className='col-5'>
                                        <span className='fs-6'>
                                            {item.name}
                                        </span>
                                    </div>

                                    <div className='col-4'>
                                        <span className="text-secondary fs-6">
                                            Rs.&nbsp;{item.price} x {item.quantity} unit(s) = <b>{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder