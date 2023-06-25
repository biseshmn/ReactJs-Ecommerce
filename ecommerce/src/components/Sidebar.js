import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { FaSortAmountDown } from 'react-icons/fa'


const Sidebar = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })

            .catch(err => console.log(err))
    }, [])


    const handleFilter = id => {
        setCategory(category.filter((c) => c._id === id))
    }

    return (
        <>
            <h6 className='text-secondary'>
                <FaSortAmountDown />&nbsp;
                <span>Filters</span>
            </h6>

            <div className='mb-3'>
                <h6>Categories</h6>
                {category && category.map((c, i) => (
                    <div class="form-check" key={i}>
                        <input class="form-check-input" type="checkbox" value="" id={c.category_name} />
                        <label class="form-check-label" for={c.category_name} onClick={() => handleFilter(c._id)} >
                            {c.category_name}
                        </label>
                    </div>
                ))}
            </div>


            <div className='mb-3'>
                <h6>Price Range</h6>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        All
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        500-1000
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                    <label class="form-check-label" for="flexRadioDefault3">
                        5000-10000
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                    <label class="form-check-label" for="flexRadioDefault4">
                        10000-50000
                    </label>
                </div>
            </div>
        </>
    )
}

export default Sidebar