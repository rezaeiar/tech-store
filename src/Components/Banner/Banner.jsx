import React from 'react'
import { Link } from 'react-router-dom';

import './Banner.css'

function Banner() {
    return (
        <div className='banner'>
            <div className="container md-full">
                <div className="banner__wrapper">
                    <Link to='/catalog/allTypes/Asus/allSeries/allPrices/allColors' className='banner__link'>
                        <img src="/images/catalog/banner1.png" alt="Banner picture" className="banner__src" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Banner;