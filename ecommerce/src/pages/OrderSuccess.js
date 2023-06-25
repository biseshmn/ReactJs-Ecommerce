import React from 'react'
import { Link } from 'react-router-dom'
import greencheck from '../images/greencheck.png'

const OrderSuccess = () => {
    return (
        <>
            <div className='container'>
                <div className='bg-warning bg-opacity-10 rounded-3 shadow-sm my-5 p-4'>
                    <img src={greencheck} alt='order success' className='d-block mx-auto mb-3' height='150' width='150' />
                    <h5 className="text-center text-success mb-3">Congratulations! Your payment was successful.</h5>
                    <br />

                    <center>
                        <Link to="/" className='btn btn-primary'>Go to homepage</Link>&emsp;
                        <Link to="/products" className='btn btn-warning'>Browse products</Link>
                    </center>
                </div>
            </div>
        </>
    )
}

export default OrderSuccess