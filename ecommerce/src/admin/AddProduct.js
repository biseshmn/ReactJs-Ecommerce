import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'

const AddProduct = () => {
    const [categories, setCategory] = useState([])
    useEffect(() => {
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    const { token } = isAuthenticated()

    const [productData, setProductData] = useState({
        product_name: '',
        product_price: '',
        countInStock: '',
        product_desc: '',
        product_img: '',
        category: ''
    })
    const { product_name, product_price, product_desc, countInStock } = productData


    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handelChange = name => event => {
        setProductData({ ...productData, error: false, [name]: event.target.value })
    }

    const handelImageChange = event => {
        setProductData({ ...productData, product_img: event.target.files[0] })
    }


    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const formData = new FormData();
            formData.append('product_name', productData.product_name)
            formData.append('product_price', productData.product_price)
            formData.append('countInStock', productData.countInStock)
            formData.append('product_desc', productData.product_desc)
            formData.append('product_img', productData.product_img)
            formData.append('category', productData.category)

            const config = {
                headers: {
                    'content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            };

            const response = await axios.post(`${API}/postproduct`, formData, config)
            setSuccess(true)
            setError(false)
            setProductData({
                product_name: '',
                product_price: '',
                countInStock: '',
                product_desc: '',
                product_img: '',
                category: ''
            })
        }

        catch (err) {
            setError(err.response.data.error)
            setSuccess(false)
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
            Your product has been added
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb-3">Add product</h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="pname">Product Name</label>
                            <input type="text" id='pname' className='form-control' onChange={handelChange('product_name')} value={product_name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price">Product Price</label>
                            <input type="number" id='price' className='form-control' onChange={handelChange('product_price')} value={product_price} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="qty">Stock Quantity</label>
                            <input type="number" id='qty' className='form-control' onChange={handelChange('countInStock')} value={countInStock} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="desc">Product Description</label>
                            <textarea id='desc' className='form-control' onChange={handelChange('product_desc')} value={product_desc}></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image">Product Image</label>
                            <input type="file" id='image' className='form-control' accept='image/*' onChange={handelImageChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category">Category</label>
                            <select className='form-control' onChange={handelChange('category')}>
                                {categories.map((c, i) => (
                                    <option key={i} value={c._id}> {c.category_name} </option>
                                ))}
                            </select>
                        </div>

                        <button className='btn btn-primary' onClick={handleSubmit}> Add product </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct