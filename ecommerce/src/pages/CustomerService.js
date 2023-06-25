import React from 'react'
import { FaEnvelope, FaPhone, FaPhoneAlt } from 'react-icons/fa'

const CustomerService = () => {
    return (
        <div className='container p-4'>
            <div className='bg-primary bg-opacity-10 rounded-3 shadow-sm p-3'>
                <h5>Customer Service</h5>
                <br />

                <div className='d-flex flex-column bg-white bg-opacity-75 rounded-3 p-3'>
                    <h6>In case of an emergency use,</h6>
                    <span> <FaEnvelope />&nbsp; eshopspot@gmail.com </span>
                    <span> <FaPhoneAlt />&nbsp; 9876543210 </span>
                    <br />

                    <h6>For techical support use,</h6>
                    <span> <FaEnvelope />&nbsp; eshopspot_tech@gmail.com </span>
                    <span> <FaPhoneAlt />&nbsp; 9876543210 </span>
                    <br />

                    <h6>For sales/package inquiry use,</h6>
                    <span> <FaEnvelope />&nbsp; eshopspot_package@gmail.com </span>
                    <span> <FaPhoneAlt />&nbsp; 9876543210 </span>
                </div>
                <br />

                <h6 className='text-secondary'>Visit us at Eshop Spot building opposite to Sasa Banquet Nayabazar, Kathmandu, Nepal</h6>
            </div>
        </div>
    )
}

export default CustomerService