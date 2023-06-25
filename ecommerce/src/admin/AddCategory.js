import React, { useState } from 'react'
import { isAuthenticated } from '../auth'
import { addCategory } from './apiindex'

const AddCategory = () => {
    const [category_name, setCategory] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //destructure token from the localstorage
    const { token } = isAuthenticated()

    const handelChange = e => {
        setError('')
        setCategory(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        //make request add category
        addCategory(token, { category_name })

            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setError('')
                    setSuccess(true)
                    setCategory('')
                }
            })
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
            Your category has been added
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center my-5">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb-3"> Add Category </h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="category">Category Name</label>
                            <input type="text" id='category' className='form-control' onChange={handelChange} value={category_name} />
                        </div>


                        <button className='btn btn-primary' onClick={handleSubmit}> Add category </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCategory

//add product