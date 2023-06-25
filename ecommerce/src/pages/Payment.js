import React,{useState, useEffect} from 'react'
import { API } from '../config'
import axios from 'axios'
import { isAuthenticated } from '../auth'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: 'red'
        }
    }
}

const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const cartItem = JSON.parse(localStorage.getItem('cartItem'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user, token } = isAuthenticated()
    const navigate = useNavigate()

    const order = {
        orderItems: cartItem,
        shippingAddress1: shippingInfo.shippingAddress1,
        shippingAddress2: shippingInfo.shippingAddress2,
        city: shippingInfo.city,
        zip: shippingInfo.zip,
        country: shippingInfo.country,
        phone: shippingInfo.phone,
        user: user._id
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay-btn').disabled = true
        let res
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            res = await axios.post(`${API}/process/payment`, paymentData, config)
            const client_secret = res.data.client_secret

            if (!stripe || !elements) {
                return
            }
            const result = await stripe.confirmCardPayment(`${client_secret}`, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }

            })
            if (result.error) {
                toast.error(result.error.message)
                document.querySelector('#pay-btn').disabled = false
            }
            else {
                //payment processed or not
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    try {
                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        }
                        const { data } = await axios.post(`${API}/postorder`, order, config)
                        localStorage.removeItem('cartItem')
                        navigate('/success')
                    }
                    catch (error) {
                        toast.error(error)
                    }
                }
                else {
                    toast.error('something went wrong')
                }
            }
        }
        catch (error) {
            document.querySelector('#pay-btn').disabled = false
            toast.error(error.message)
        }
    }

    return (
        <>
            <ToastContainer theme='colored' />
            <div className="d-flex justify-content-center mt-5">
                <div className="col-lg-5 col-sm-8 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form onSubmit={submitHandler}>
                        <h3 className='text-primary mb-3'>Card Information</h3>


                        <div className='mb-3'>
                            <label htmlFor='card-number'>Card Number</label>
                            <CardNumberElement type='text' className='form-control' id='card-number' options={options} />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor='card-expiry'>Card Expiry Date</label>
                            <CardExpiryElement type='text' className='form-control' id='card-expiry' options={options} />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor='card-cvc'>Card Expiry CVC</label>
                            <CardCvcElement type='text' className='form-control' id='card-cvc' options={options} />
                        </div>
                        

                        <button className='btn btn-warning form-control' id='pay-btn'>
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment
