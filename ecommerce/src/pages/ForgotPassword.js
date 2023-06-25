import React, { useState } from 'react'
import { forgetpassword } from '../auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {

    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false
    })
    const { email } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        //forgetpassword function
        forgetpassword({ email })
            .then(data => {
                if (data.error) {
                    toast.error(`${email} not found`)
                }

                else {
                    toast.success(`Please check your email ${email} for password reset link`)
                }
            })

            .catch(err=>console.log(err))
        
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            <div className="d-flex justify-content-center mt-5">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb-3">Forgot Password</h3>

                        <div className="mb-3">
                            <label htmlFor="email">Enter your email</label>
                            <input type="email" id="email" className="form-control" onChange={handleChange('email')} value={email} placeholder='example@email.com' />
                        </div>

                        <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Request password reset link</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword