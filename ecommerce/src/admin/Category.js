import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
    const { token } = isAuthenticated()

    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))
    }, [])


    //delete Category
    const deleteCategory = id => {
        const confirmed = window.confirm('Are you sure you want to delete this category?')
        if (confirmed) {
            axios.delete(`${API}/deletecategory/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

                .then(res => {
                    toast.success('Category deleted')
                    setCategory(category.filter((c) => c._id !== id))
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
                <h3 className='text-primary'>Categories</h3>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Category Name</td>
                            <td>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {category && category.map((c, i) => (
                            <tr key={i}>
                                <td>{c.category_name}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteCategory(c._id)}>
                                        <FaTrash />&nbsp;
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Category