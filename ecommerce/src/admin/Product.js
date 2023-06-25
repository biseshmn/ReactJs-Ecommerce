import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { API, IMG_URL } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Product = () => {
    const { token } = isAuthenticated()

    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${API}/productlist`)
            .then(res => {
                setProducts(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    //delete product
    const deleteProduct = id => {
        const confirmed = window.confirm('Are you sure you want to delete this product?')
        if (confirmed) {
            axios.delete(`${API}/deleteproduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

                .then(res => {
                    toast.success('Products deleted')
                    setProducts(products.filter((c) => c._id !== id))
                })

                .catch(err => {
                    toast.error('Failed to delete')
                })
        }
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            <div className="container bg-info bg-opacity-10 rounded-3 shadow-sm p-2 my-2">
                <h3 className='text-primary'>Products</h3>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td width="15%">Product Name</td>
                            <td width="10%">Price</td>
                            <td width="10%">In stock</td>
                            <td width="30%">Product Description</td>
                            <td width="10%">Image</td>
                            <td width="15%">Category</td>
                            <td width="10%">Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map((p, i) => (
                            <tr key={i}>
                                <td>{p.product_name}</td>
                                <td>{p.product_price}</td>
                                <td>{p.countInStock}</td>
                                <td>{p.product_desc}</td>
                                <td><img src={`${IMG_URL}/${p.product_img}`} width='100' alt="{p.product_name}" /></td>
                                <td>{p.category.category_name}</td>
                                <td>
                                    <div className='d-flex gap-2'>
                                        <Link to={`/admin/updateproduct/${p._id}`} className="btn btn-primary" title="Edit">
                                            <FaEdit />
                                        </Link>

                                        <button className="btn btn-danger" onClick={() => deleteProduct(p._id)} title="Delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product