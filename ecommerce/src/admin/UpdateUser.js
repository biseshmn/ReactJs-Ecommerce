import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const { token } = isAuthenticated()
    const params = useParams()
    const id = params.userId
    
    
    const [user_name, setName] = useState('')
    const [user_email, setEmail] = useState('')
    
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    
    
    useEffect(() => {
        axios.get(`${API}/userdetail/${id}`)
            .then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
            })

            .catch(err => console.log(err))
    }, [])



    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', user_name)
        formData.append('email', user_email)

        try {
            const response = await axios.put(
                `${API}/userupdate/${id}`,

                formData,

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }

            )

            setSuccess(true)
            setError('')
        }

        catch (err) {
            setError(err.response.data.error)
            setSuccess('')
        }

    }

    //to show error msg
    const showError = () => (
        error && <div className='alert alert-danger'>
            {error}
        </div>
    )

    //to show success msg
    const showSuccess = () => (
        success && <div className='alert alert-success'>
            User Updated
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb3"> Update User </h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="uname">User Name</label>
                            <input type="text" id='uname' className='form-control' onChange={(e) => setName(e.target.value)} value={user_name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' className='form-control' onChange={(e) => setEmail(e.target.value)} value={user_email} />
                        </div>

                        <button className='btn btn-primary' onClick={handleSubmit}> Update user </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct