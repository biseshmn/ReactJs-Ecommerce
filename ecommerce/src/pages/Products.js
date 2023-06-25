import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../config'
import Card from '../components/Card'
// import Sidebar from '../components/Sidebar'
import { FaCaretDown } from 'react-icons/fa'
import { FaSortAmountDown } from 'react-icons/fa'


const Products = () => {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState([])

    const [category, setCategory] = useState([])

    const [limit, setLimit] = useState(3)



    //get products from database
    useEffect(() => {
        axios.get(`${API}/productlist`)
            .then(res => {
                setProducts(res.data)
                setFilter(res.data)
            })

            .catch(err => console.log(err))


        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))
    }, [])



    //to show all products
    const showAll = () => {
        axios.get(`${API}/productlist`)

        .then(res => {
            setFilter(res.data)
        })

        .catch(err => console.log(err))
    }



    //filter the products according to category
    const handleFilter = id => {
        setFilter(products.filter((p) => p.category._id === id))
    }



    //filter the products according to range
    const handleRange = (a,b) => {
        setFilter(filter.filter((p) => p.product_price>a && p.product_price<b))
    }

    return (
        <>
            <div className="p-4">
                <h3 className='text-primary'>Our Products and Promotions</h3>
                <br />

                <div className="row d-flex justify-content-between">
                    <div className="col-md-2">
                        <h6 className='text-secondary'>
                            <FaSortAmountDown />&nbsp;
                            <span>Filters</span>
                        </h6>

                        <div className='mb-3'>
                            <h6>Categories</h6>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="all" name="filterCategory" onClick={showAll} checked/>
                                <label className="form-check-label" htmlFor="all" >
                                    All
                                </label>
                            </div>

                            {category && category.map((c, i) => (
                                <div className="form-check" key={i}>

                                    <input type="radio" className="form-check-input" id={c._id} name="filterCategory" onClick={(e) => handleFilter(c._id)} />
                                    <label className="form-check-label" htmlFor={c._id} >
                                        {c.category_name}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <div className='mb-3'>
                            <h6>Price Range</h6>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="filterRange" id="flexRadioDefault1" onClick={showAll} checked/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    All
                                </label>
                            </div>

                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="filterRange" id="flexRadioDefault2" onClick={() => handleRange(500,1000)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    500-1000
                                </label>
                            </div>

                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="filterRange" id="flexRadioDefault3" onClick={() => handleRange(5000,10000)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    5000-10000
                                </label>
                            </div>

                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="filterRange" id="flexRadioDefault4" onClick={() => handleRange(10000,50000)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    10000-50000
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
                            {filter && filter.slice(0, limit).map((product, i) => (
                                <Card key={i} item={product} />
                            ))}
                        </div>

                        <center className='my-4'>
                            {
                                limit < products.length &&
                                <button className='btn btn-primary text-center' onClick={() => setLimit(limit + 3)}>
                                    <FaCaretDown />&nbsp;
                                    <span>Show more</span>
                                </button>
                            }
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products