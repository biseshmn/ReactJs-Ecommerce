import React, { useState, useEffect, Fragment } from 'react'
import { API } from '../config'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut } from '../auth'
import { FaCartPlus, FaRegUser, FaSearch, FaSignInAlt, FaSignOutAlt, FaUserCheck, FaUserPlus } from 'react-icons/fa'


const Header = () => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [productname, setProductName] = useState([])

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem('cartItem')))

        axios.get(`${API}/productlist`)
            .then(res => {
                setProductName(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setProductName(e.target.value)
        navigate('/productdetails/e.target.value')
    };

    return (
        <>
            <div className="container-fluid bg-white p-0">
                <div className="d-flex align-items-center justify-content-between gap-4 px-4">

                    <Link to="/" className="navbar-brand text-primary">
                        <b className='fs-2'>E</b>
                        <b className='fs-3'>Shop</b>&nbsp;
                        <small>Spot</small>
                    </Link>


                    <form className="d-flex gap-1 flex-fill">
                        <div className="input-group">
                            {/* <input className="form-control border-0 bg-primary bg-opacity-10" type="search" placeholder="Search" aria-label="Search" /> */}

                            <select className='form-control' id='productname' onChange={(e) => handleChange}>

                                <option>Search products</option>

                                {productname.map((p, i) => (
                                    <option key={i} value={p._id}>{p.product_name}</option>
                                ))}
                            </select>

                            <Link to='/productdetails/${productname._id}' className="btn bg-primary bg-opacity-25 border-0" type="submit">
                                <FaSearch />
                            </Link>
                        </div>
                    </form>


                    <div className="d-flex align-items-center gap-3">
                        {isAuthenticated() && isAuthenticated().user.role === 1 &&
                            <Link to="/admin/dashboard" className="text-decoration-none" title="admin">
                                <button className='btn btn-info d-flex align-items-center'>
                                    <FaUserCheck />&nbsp;
                                    <span>Admin</span>
                                </button>
                            </Link>
                        }

                        {isAuthenticated() && isAuthenticated().user.role === 0 &&
                            <Link to="/profile" className="text-decoration-none" title="profile">
                                <button className='btn btn-primary d-flex align-items-center'>
                                    <FaRegUser />&nbsp;
                                    <span>Profile</span>
                                </button>
                            </Link>
                        }


                        {!isAuthenticated() &&
                            <>
                                <Link to="/signin" className="text-decoration-none" title="Sign In">
                                    <button className='btn btn-info d-flex align-items-center'>
                                        <FaSignInAlt />&nbsp;
                                        <span>LogIn</span>
                                    </button>
                                </Link>

                                <Link to="/signup" className="text-decoration-none" title="Sign Up">
                                    <button className='btn btn-primary d-flex align-items-center'>
                                        <FaUserPlus />&nbsp;
                                        <span>Register</span>
                                    </button>
                                </Link>

                            </>
                        }

                        {isAuthenticated() &&
                            <>
                                <Link to="/cart" className="text-decoration-none" title="cart">
                                    <button className="btn btn-warning d-flex align-items-center position-relative">
                                        <FaCartPlus />&nbsp;
                                        <span>Cart</span>

                                        <span className="position-absolute start-100 mt-1 translate-middle badge rounded-pill bg-dark bg-opacity-75" style={{ fontSize: '12px' }}>
                                            <span>
                                                {
                                                    products ? products.length : 0
                                                }
                                            </span>
                                        </span>
                                    </button>
                                </Link>

                                <button className="btn btn-danger d-flex align-items-center" onClick={() => signOut(() => { navigate('/signin') })}>
                                    <FaSignOutAlt />&nbsp;
                                    <span>LogOut</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>


            <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-opacity-10 p-0">
                <div className="container-fluid">
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Products</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/customerservice" className="nav-link">Customer service</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header