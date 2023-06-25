import React from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { IMG_URL } from '../config'

const Profile = () => {
    const { user } = isAuthenticated()

    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const cartItems = JSON.parse(localStorage.getItem('cartItem'))

    return (
        <>
            <div className='container my-5'>
                <div className='d-flex flex-column align-items-baseline bg-primary bg-opacity-10 rounded-3 p-3'>
                    <h4>Welcome to your profile!</h4>
                    <p>Your are now logged in. Here you can see you profile detail</p>

                    <table className='col-4 mb-4'>
                        <tbody>
                            <tr>
                                <td className='col-1'>Role</td>
                                <td className='col-3'>User</td>
                            </tr>

                            <tr>
                                <td className='col-1'>Name</td>
                                <td className='col-3'>{user.name}</td>
                            </tr>

                            <tr>
                                <td className='col-1'>Email</td>
                                <td className='col-3'>{user.email}</td>
                            </tr>

                            <tr>
                                <td className='col-1'>Phone</td>
                                <td className='col-3'>{shippingInfo.phone}</td>
                            </tr>

                            <tr>
                                <td className='col-1'>Address</td>
                                <td className='col-3'>{shippingInfo.country}, {shippingInfo.city}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <Link to='/updateprofile/' className='btn btn-warning'>Update profile</Link> */}
                </div>
                <br />



                {
                    cartItems && cartItems.length > 0 &&
                    <>
                        <div className='d-flex flex-column align-items-baseline bg-primary bg-opacity-10 rounded-3 p-3'>
                            <h4>Currently in your cart</h4>
                            {
                                cartItems.map((item, i) => (
                                    <div className='row d-flex align-items-center bg-primary bg-opacity-10 rounded-3 w-100 mb-2' key={i}>
                                        <div className='col-3 p-2'>
                                            <img src={`${IMG_URL}/${item.image}`} alt={item.name} className="img-fluid" width="100" height="100" />
                                        </div>

                                        <div className='col-5'>
                                            <span className='fs-6'>
                                                {item.name}
                                            </span>
                                        </div>

                                        <div className='col-4'>
                                            <span className="text-secondary fs-6">
                                                Rs.&nbsp;{item.price} x {item.quantity} = <b>{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    </div>


                                ))
                            }
                            <Link to="/cart" className="btn btn-warning text-decoration-none" title="cart"> Go to cart</Link>
                        </div >
                    </>
                }
            </div>
        </>
    )
}

export default Profile
