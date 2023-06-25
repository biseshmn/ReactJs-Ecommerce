import React, { useState, useEffect } from 'react'
import Slider from '../components/Slider'
import Card from '../components/Card'
import axios from 'axios'
import { API } from '../config'
import { Link } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa'

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(3)
    useEffect(() => {
        axios.get(`${API}/productlist`)
            .then(res => {
                setProducts(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Slider />

            <div className="container-fluid mt-4 mb-5">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products && products.slice(0, limit).map((product, i) => (
                        <Card key={i} item={product} />
                    ))}
                </div>

                <center className='my-4'>
                    {
                        limit < 6 ?
                        <button className='btn btn-primary text-center' onClick={() => setLimit(limit + 3)}>
                            <FaCaretDown />&nbsp;
                            <span>Show more</span>
                        </button>
                    
                       
                       : <Link to='/products' className='btn btn-warning text-center'>
                            View all products
                        </Link>
                    }
                </center>
            </div>
        </>
    )
}

export default HomePage