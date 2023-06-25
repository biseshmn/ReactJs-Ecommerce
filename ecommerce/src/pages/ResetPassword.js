import React, { useState } from 'react'
// import axios from 'axios'
import { API } from '../config'
import { useParams } from 'react-router-dom'
import { showPassword } from '../components/ShowPassword'

const ResetPassword = () => {
    const { params } = useParams()

    const [values, setValues] = useState({
        password: '',
        error: '',
        success: false
    })
    const { password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })
        const token = params

        fetch(`${API}/resetpassword/${token}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })

            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, error: '', password: '', success: true })
                }
            })
        // .catch(err=>console.log(err))

    }

    //to show error msg
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    //to show success msg
    const showSuccess = () => (
        <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
            Your password has been reset
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        {showError()}
                        {showSuccess()}
                        <h3 className="text-primary mb-3">Reset Password</h3>

                        <div className="mb-3">
                            <label htmlFor="password">New Password</label>
                            <div className="input-group">
                                <input type="password" id="password" className="form-control" aria-describedby="showPasswordBtn" onChange={handleChange('password')} value={password} />
                                <button className="btn btn-outline-secondary" type="button" id="showPasswordBtn" title="Show Password" onClick={showPassword}>
                                    <i className="fas fa-eye" id="passwordIcon"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Reset password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword