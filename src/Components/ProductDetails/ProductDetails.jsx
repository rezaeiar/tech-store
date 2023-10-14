import React from 'react'

import './ProductDetails.css'

function ProductDetails({ productInfos }) {
    return (
        <ul className="productDetails__list">
            {
                productInfos &&
                productInfos[0].furtherDetails.map(detail => (
                    <li key={detail} className="productDetails__item">
                        {detail}
                    </li>
                ))
            }
        </ul>
    )
}

export default ProductDetails;