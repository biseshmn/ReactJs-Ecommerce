import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { user } = isAuthenticated()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        //products
        axios.get(`${API}/productlist`)
            .then(res => {
                setProducts(res.data)
            })

            .catch(err => console.log(err))


        //categories
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))


        //users
        axios.get(`${API}/userlist`)
            .then(res => {
                setUsers(res.data)
            })

            .catch(err => console.log(err))

        //orders
        axios.get(`${API}/orderlist`)
            .then(res => {
                setOrders(res.data)
            })

            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <div className="container-fluid">
                <h2 className="text-center text-primary mb-3">
                    Admin Dashboard
                </h2>

                <div className="row d-flex">
                    <div className="col-md-6 col-xl-4 mb-4">
                        <div className="card shadow border-0 py-2 bg-primary">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                            <span>
                                                Admins
                                            </span>
                                        </div>
                                        <div className="text-white fw-bold mb-0 text-center">
                                            <span>Registerd admins: 1</span>
                                        </div>
                                        <div className="col-auto text-center">
                                            <i className="fas fa-user-tie fs-1 text-white"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <div className="card shadow border-0 py-2 bg-warning">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                            <span>
                                                Total Users
                                            </span>
                                        </div>
                                        <div className="text-secondary fw-bold mb-0 text-center">
                                            <span>Registered users: {users.length}</span>
                                        </div>
                                        <div className="col-auto text-center">
                                            <i className="fas fa-users fs-1 text-success"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <div className="card shadow border-0 py-2 bg-secondary">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                            <span>
                                                Categories
                                            </span>
                                        </div>
                                        <div className="text-white fw-bold mb-0 text-center">
                                            <span>Sub-Categories: {category.length}</span>
                                        </div>
                                        <div className="col-auto text-center">
                                            <i className="fas fa-globe fs-1 text-white"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="#" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-success">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Total Products
                                                </span>
                                            </div>
                                            <div className="text-warning fw-bold mb-0 text-center">
                                                <span>In circulation: {products.length}</span>
                                            </div>
                                            <div className="col-auto text-center">
                                                <i className="fas fa-box fs-1 text-light"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="#" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-light">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Orders
                                                </span>
                                            </div>
                                            <div className="text-secondary fw-bold mb-0 text-center">
                                                <span>Total orders: {orders.length}</span>
                                            </div>
                                            <div className="col-auto text-center">
                                                <i className="fas fa-shopping-cart fs-1 text-success"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="#" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-danger">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Sales
                                                </span>
                                            </div>
                                            <div className="text-white fw-bold mb-0 text-center">
                                                <span>Pending orders: {orders.length}</span>
                                            </div>
                                            <div className="col-auto text-center">
                                                <i className="fab fa-first-order-alt fa-spin fs-1 text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard