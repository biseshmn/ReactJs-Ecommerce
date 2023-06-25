import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth'

const Register = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        error: '',
        success: false
    })
    const { name, email, role, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values })

        //signup function
        signup({ name, email, role, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }

                else {
                    setValues({ ...values, name: '', email: '', password: '', role:'', success: true })
                }
            })
    }

    //to show error msg
    const showError=()=>(
        <div className='alert alert-danger' style={{display: error? '' :'none' }}>
            {error}
        </div>
    )

    //to show success msg
    const showSuccess=()=>(
        <div className='alert alert-success' style={{display: success? '' :'none' }}>
            New account created, verify your account before login
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb-3">
                            Register Form
                        </h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="firstname">Full Name</label>
                            <input type="text" id="fname" className="form-control" onChange={handleChange('name')} value={name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-control" onChange={handleChange('email')} value={email} />
                        </div>
                        

                        <div className="mb-3">
                            <label htmlFor="role">Role</label>
                            <input type="number" id="role" className="form-control" min="0" max="1" onChange={handleChange('role')} value={role} placeholder='Type 1 Admin, 0 for User'/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" className="form-control" onChange={handleChange('password')} value={password} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpass">Confirm Password</label>
                            <input type="password" id="cpass" className="form-control" />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
                        </div>

                        <Link to="/signin" className='text-decoration-none'>
                            Already have an account? Log in instead
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register