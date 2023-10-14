import React from 'react'
import { Link } from 'react-router-dom';

import './CatalogBanner.css'

function CatalogBanner() {
    return (
        <div className='catalog-banner'>
            <Link to='/catalog/allTypes/allBrands/allSeries/allPrices/allColors' className="catalog-banner__link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img src="/images/header/image 49.png" alt="Banner picture" className='catalog-banner__src' />
            </Link>
        </div>
    )
}
export default CatalogBanner;