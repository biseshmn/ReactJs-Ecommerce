import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth'
// import React from 'react'

const UpdateProfile = () => {
    const params = useParams()
    const id = params.userID

    const { token } = isAuthenticated()


    const [username, setUserName] = useState('')
    const [useremail, setUserEmail] = useState('')

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        axios.get(`${API}/userdetail/${id}`)
            .then(res => {
                setUserName(res.data.name)
                setUserEmail(res.data.email)
            })

            .catch(err => console.log(err))
    }, [])



    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('name', username)
        formData.append('email', useremail)

        try {
            const response = await axios.put(
                `${API}/userupdate/${id}`,

                formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
                        <h3 className="text-primary mb3"> Update profile </h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="username">User Name</label>
                            <input type="text" id='username' className='form-control' onChange={(e) => setUserName(e.target.value)} value={username}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="useremail">User Email</label>
                            <input type="email" id='useremail' className='form-control' onChange={(e) => setUserEmail(e.target.value)} value={useremail} />
                        </div>

                        <button className='btn btn-primary' onClick={handleSubmit}> Update profile </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile