import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const params = useParams()
    const id = params.productId

    const [categories, setCategory] = useState([])
    const [initialValues, setInitialValues] = useState({})
    const { token } = isAuthenticated()


    const [product_name, setProductName] = useState('')
    const [product_price, setProductPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [product_desc, setProductDesc] = useState('')
    const [product_img, setProductImg] = useState(null)
    const [categoryId, setCategoryId] = useState('')

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))

        axios.get(`${API}/productdetail/${id}`)
            .then(res => {
                setInitialValues(res.data)
                setProductName(res.data.product_name)
                setProductPrice(res.data.product_price)
                setCountInStock(res.data.countInStock)
                setProductDesc(res.data.product_desc)
                setCategoryId(res.data.category._id)
            })

            .catch(err => console.log(err))
    }, [])



    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('product_name', product_name)
        formData.append('product_price', product_price)
        formData.append('countInStock', countInStock)
        formData.append('product_desc', product_desc)
        formData.append('product_img', product_img)
        formData.append('category', categoryId)

        try {
            const response = await axios.put(
                `${API}/updateproduct/${id}`,

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
            Product Updated
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <div className="col-lg-5 bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm p-4">
                    <form>
                        <h3 className="text-primary mb3"> Update product </h3>

                        {showError()}
                        {showSuccess()}

                        <div className="mb-3">
                            <label htmlFor="pname">Product Name</label>
                            <input type="text" id='pname' className='form-control' onChange={(e) => setProductName(e.target.value)} value={product_name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price">Product Price</label>
                            <input type="number" id='price' className='form-control' onChange={(e) => setProductPrice(e.target.value)} value={product_price} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="qty">Stock Quantity</label>
                            <input type="number" id='qty' className='form-control' onChange={(e) => setCountInStock(e.target.value)} value={countInStock} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="desc">Product Description</label>
                            <textarea id='desc' className='form-control' onChange={(e) => setProductDesc(e.target.value)} value={product_desc}></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image">Product Image</label>
                            <input type="file" id='image' className='form-control' accept='image/*' onChange={(e) => setProductImg(e.target.files[0])} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category">Category</label>
                            <select className='form-control' onChange={(e) => setCategoryId(e.target.value)}>
                                <option value={categoryId} disabled> {initialValues.category && initialValues.category.category_name} </option>

                                {categories && categories.map((c, i) => (
                                    <option key={i} value={c._id}> {c.category_name} </option>
                                ))}
                            </select>
                        </div>

                        <button className='btn btn-primary' onClick={handleSubmit}> Update product </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct