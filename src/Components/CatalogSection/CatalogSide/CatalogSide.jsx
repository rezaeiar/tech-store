import React from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import CatalogFilters from '../CatalogFilters/CatalogFilters'
import CatalogBrands from '../CatalogBrands/CatalogBrands'
import CompareProducts from '../CompareProducts/CompareProducts'
import CatalogMyWishList from '../CatalogMyWishList/CatalogMyWishList'
import CatalogBanner from '../CatalogBanner/CatalogBanner'
import { Link } from 'react-router-dom'

import './CatalogSide.css'

function CatalogSide() {
    return (
        <div className='catalog-side'>
            <button className="catalog-side__back">
                <Link to='/' className='catalog-side__link'>
                    <BiChevronLeft />
                    Back
                </Link>
            </button>
            <CatalogFilters />
            <CatalogBrands />
            <CompareProducts />
            <CatalogMyWishList />
            <CatalogBanner />
        </div>
    )
}
export default CatalogSide;