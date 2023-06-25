import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API, IMG_URL } from '../config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaCartPlus } from 'react-icons/fa'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const params = useParams()

    useEffect(() => {
        const id = params.productId
        axios.get(`${API}/productdetail/${id}`)

            .then(res => {
                setProduct(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    //add to cart
    const addToCart = () => {
        const cartItem = JSON.parse(localStorage.getItem('cartItem')) || []
        const productItem = {
            id: product._id,
            name: product.product_name,
            price: product.product_price,
            image: product.product_img,
            category: product.category,
            description: product.product_desc,
            countInStock: product.countInStock,
            quantity: 1
        }

        const existingItem = cartItem.find(item => item.id === product._id)
        if (existingItem) {
            toast.error('Product already in the cart')
        }
        else {
            cartItem.push(productItem)
            localStorage.setItem('cartItem', JSON.stringify(cartItem))
            toast.success(`${productItem.quantity} ${productItem.name} is added to cart`)
        }
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            <div className='container bg-info bg-gradient bg-opacity-10 rounded-3 shadow-sm my-4'>
                <div className='row d-flex justify-content-between py-4'>
                    <div className='col-md-4'>
                        <img src={`${IMG_URL}/${product.product_img}`} alt={product.product_name} className='img-fluid' style={{objectFit:'contain', height:'250px', width:'100%'}}/>
                    </div>

                    <div className='col-md-8 d-flex flex-column align-items-start justify-content-between'>
                        <div className='product-details'>
                            <h4>{product.product_name}</h4>
                            <h6 className='text-secondary'>Rs. {product.product_price}</h6>
                            <p>{product.product_desc}</p>
                            <span className='text-secondary'>{product.countInStock} item(s) remaining in stock</span>
                        </div>
                        <br />

                        <button className='btn bg-warning d-flex align-items-center bg-opacity-75' onClick={addToCart}>
                            <FaCartPlus />&nbsp;
                            <span>Add to cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails