import React from 'react'
import { FaFacebookF, FaRegEnvelope, FaTwitter } from 'react-icons/fa'
// import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="container-fluid footer bg-white p-0" style={{boxShadow:'0px -2px 10px 0px rgb(0, 0, 0, 10%'}}>

                <footer className=" d-flex align-items-center justify-content-between px-3 py-2">
                    <small className='text-primary text-opacity-75'>All Rights Reserved &copy; 2023</small>

                    <div className='d-flex gap-4'>
                        <FaFacebookF className='text-primary' title='Facebook'/>
                        <FaTwitter className='text-primary text-opacity-75' title='Twitter'/>
                        <FaRegEnvelope className='text-warning' title='Gmail'/>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer