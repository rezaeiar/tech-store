import React from 'react'

import './CompareProducts.css'

function CompareProducts() {
    return (
        <div className='compare-products'>
            <div className="compare-products__head">
                <h4 className="compare-products__title">
                    Compare Products
                </h4>
            </div>
            <div className="compare-products__content">
                <span className="compare-products__message">
                    You have no items to compare.
                </span>
            </div>
        </div>
    )
}
export default CompareProducts;