import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut } from '../auth'
import { FaBox, FaBoxes, FaCartPlus, FaClipboard, FaHome, FaRegAddressCard, FaRegEnvelope, FaSignOutAlt, FaSitemap, FaUserCog, FaUsers } from 'react-icons/fa'

const AdminSidebar = () => {

    const { user } = isAuthenticated()

    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex justify-content-start p-2">
                <button className="btn btn-primary d-flex align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasRight">
                    <FaUserCog />&nbsp;
                    <span>
                        Admin controls
                    </span>
                </button>

                <div className="offcanvas offcanvas-start p-3" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasRightLabel" style={{ width: '300px' }}>
                    <div className="offcanvas-header flex-grow-0 p-0 mb-4">
                        <span className='fs-5' id="offcanvasRightLabel">Admin controls</span>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body d-flex flex-grow-0 bg-primary bg-opacity-10 rounded-3 mb-4 p-3">
                        <div className="d-flex flex-column gap-2 fs-6">
                            <div className='user-info'>
                                <FaRegAddressCard />&emsp;
                                <span>{user.name}</span>
                            </div>

                            <div className='user-info'>
                                <FaRegEnvelope />&emsp;
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="offcanvas-body flex-grow-0 bg-primary bg-opacity-10 rounded-3 mb-4 p-3">
                        <div className="d-flex flex-column gap-2 text-dark">
                            <Link to="/admin/dashboard" className="text-decoration-none text-dark">
                                <FaClipboard />&emsp;
                                <span>Dashboard</span>
                            </Link>

                            <Link to="/admin/users" className="text-decoration-none text-dark">
                                <FaUsers />&emsp;
                                <span>Users</span>
                            </Link>

                            <Link to="/admin/product" className="text-decoration-none text-dark">
                                <FaBox />&emsp;
                                <span>Products</span>
                            </Link>

                            <Link to="/admin/category" className="text-decoration-none text-dark">
                                <FaSitemap />&emsp;
                                <span>Categories</span>
                            </Link>

                            <Link to="#" className="text-decoration-none text-dark">
                                <FaCartPlus />&emsp;
                                <span>Orders</span>
                            </Link>

                            <Link to="/admin/addproduct" className="text-decoration-none text-dark">
                                <FaBoxes />&emsp;
                                <span>Add product</span>
                            </Link>

                            <Link to="/admin/addcategory" className="text-decoration-none text-dark">
                                <FaSitemap />&emsp;
                                <span>Add category</span>
                            </Link>

                            <Link to="/" className="text-decoration-none text-dark">
                                <FaHome />&emsp;
                                <span>Go to home page</span>
                            </Link>
                        </div>
                    </div>

                    <div className="offcanvas-footer p-0">
                        <button className="btn btn-danger" onClick={() => signOut(() => { navigate('/signin') })}>
                            <FaSignOutAlt />&nbsp;
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar