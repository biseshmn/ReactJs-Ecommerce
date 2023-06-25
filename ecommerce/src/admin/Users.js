import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Category = () => {
    const { token } = isAuthenticated()

    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get(`${API}/userlist`)
            .then(res => {
                setUser(res.data)
            })

            .catch(err => console.log(err))
    }, [])


    //delete User
    const deleteUser = id => {
        const confirmed = window.confirm('Are you sure you want to delete this category?')

        if (confirmed) {
            axios.delete(`${API}/userdelete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

                .then(res => {
                    toast.success('User deleted')
                    setUser(user.filter((c) => c._id !== id))
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
                <h3 className='text-primary'>Users</h3>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Role</td>
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Created At</td>
                            <td>Delete User</td>
                        </tr>
                    </thead>

                    <tbody>
                        {user && user.map((u, i) => (
                            <tr key={i}>
                                <td>
                                    {
                                        u.role === 1 ? "Admin" : "User"
                                    }
                                </td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.createdAt}</td>
                                <td>
                                    <div className='d-flex gap-2'>
                                        <Link to={`/admin/updateuser/${u._id}`} className="btn btn-primary btn-sm" title="Edit user">
                                            <FaEdit />
                                        </Link>

                                        <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)} title="Delete user">
                                            <FaTrash />&nbsp;
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

export default Category