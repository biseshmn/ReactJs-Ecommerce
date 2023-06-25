import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IMG_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { signin} from '../auth'

const Cart = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const cartData = localStorage.getItem('cartItem')
        const cartItems = JSON.parse(cartData)
        if (cartItems && cartItems.length > 0) {
            setProducts(cartItems)
        }
        else {
            setProducts([])
        }
    }, [])

    //decrease quantity
    const decreaseQty = (id) => {
        const updateProducts = products.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })

        setProducts(updateProducts)
        localStorage.setItem('cartItem', JSON.stringify(updateProducts))
    }


    //increase quantity
    const increaseQty = (id) => {
        const updateProducts = products.map(item => {
            if (item.id === id && item.quantity < item.countInStock) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })

        setProducts(updateProducts)
        localStorage.setItem('cartItem', JSON.stringify(updateProducts))
    }


    //remover from cart
    const removeCartHandler = (id, name) => {
        const cartItem = JSON.parse(localStorage.getItem('cartItem'))
        const filterCart = cartItem.filter(item => item.id !== id)
        localStorage.setItem('cartItem', JSON.stringify(filterCart))
        setProducts(filterCart)

        toast.success(`${name} is removed from your cart`)
    }

    //shipping handler
    const shippingHandler = () => {
        if (signin) {

            navigate('/signin?redirect=shipping')
        }
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            <div className="container">
                <div className="row">
                    {products && products.length === 0 ?
                        <div className='bg-info bg-opacity-25 rounded-3 shadow-sm my-5 p-4'>
                            <h3 className="text-center text-primary mb-3">Your cart is empty</h3>
                            <br />

                            <center>
                                <Link to="/" className='btn btn-primary'>Go to homepage</Link>&emsp;
                                <Link to="/products" className='btn btn-warning'>Browse products</Link>
                            </center>
                        </div>

                        : (
                            <>
                                <h3 className="text-primary mt-3">Your cart items</h3>
                                <div className="col-md-9 d-flex flex-column gap-2 rounded-start">

                                    {products && products.map((item, i) => (
                                        <Fragment key={i}>
                                            <div className="d-flex align-items-center bg-info bg-gradient bg-opacity-10">
                                                <div className="col-3 p-2">
                                                    <img src={`${IMG_URL}/${item.image}`} alt={item.name} className="img-fluid" width="150" height="150" />
                                                </div>

                                                <div className="col-3">
                                                    <span className='fs-6'>{item.name}</span>
                                                </div>

                                                <div className="col-2">
                                                    <span className="text-success">Rs.&nbsp;{item.price}</span>
                                                </div>

                                                <div className="col-3">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button type="button" className="btn btn-warning" onClick={() => decreaseQty(item.id)}>-</button>
                                                        <button type="button" className="btn btn-light" disabled>{item.quantity}</button>
                                                        <button type="button" className="btn btn-primary" onClick={() => increaseQty(item.id)}>+</button>
                                                    </div>
                                                </div>

                                                <div className="col-1">
                                                    <button className="btn btn-danger" onClick={() => removeCartHandler(item.id, item.name)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>



                                <div className="col-md-3 p-2 bg-info bg-gradient bg-opacity-10 rounded-end">

                                    <h3 className='text-primary'>Cart Summary</h3>
                                    <hr />

                                    <h6>
                                        <span>Units: </span>

                                        <span className='text-success'>
                                            {products.reduce((acc, item) => (
                                                acc + item.quantity), 0
                                            )}
                                        </span>
                                    </h6>

                                    <h6>
                                        <span>Total: </span>

                                        <span className='text-success'>
                                            Rs.
                                            {products.reduce((acc, item) => (
                                                acc + item.quantity * item.price), 0
                                            )}
                                        </span>
                                    </h6>
                                    <hr />

                                    <button className="btn btn-warning" onClick={shippingHandler}>Check out</button>

                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Cart