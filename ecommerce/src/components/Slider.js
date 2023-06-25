import React from 'react'
import slider1 from '../images/slider1.png'
import slider2 from '../images/slider2.png'
import slider3 from '../images/slider3.png'

const Slider = () => {
    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide mb-5" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>

                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slider1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>The Eshop Spot</h5>
                            <p>Your one and only destination for online shopping</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={slider2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Lots of choices</h5>
                            <p>Multiple categories and products to choose from</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={slider3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Easy to make purchase</h5>
                            <p>Now with a press of a button buy as many items as you like</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider