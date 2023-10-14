import React from 'react'

import './ProductSpece.css'

function ProductSpece({ productInfos }) {
    return (
        <ul className='productSpece'>
            {
                productInfos &&
                productInfos[0].spece.map(item => (
                    <li className="productSpece__item" key={item.key}>
                        <span className="productSpece__section">
                            {item.key}
                        </span>
                        <span className="productSpece__section value">
                            {item.value}
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}

export default ProductSpece
