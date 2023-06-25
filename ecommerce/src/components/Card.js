import React from 'react'
import { IMG_URL } from '../config'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const { _id, product_name, product_price, product_img } = props.item

    return (
        <>
            <div className="col">
                <div className="card shadow-sm">
                    <img src={`${IMG_URL}/${product_img}`} className="card-img-top" alt={product_name} />

                    <div className="card-body bg-info bg-gradient bg-opacity-10">
                        <h4 className="card-title">{product_name}</h4>
                        <h6 className="card-desc text-secondary">Rs. {product_price}</h6>
                        <Link to={`/productdetails/${_id}`} className="btn btn-primary">View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card