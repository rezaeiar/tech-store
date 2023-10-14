import React, { useState, useEffect } from 'react'

import './AboutProduct.css'

function AboutProduct({ productInfos }) {
    const [allColors, setAllColors] = useState([])
    const [thisColor, setThisColor] = useState('')

    useEffect(() => {
        setAllColors(productInfos ? productInfos[0].colors : [])
        setThisColor(productInfos ? productInfos[0].colors[0] : '')
    }, [productInfos])
    return (
        <>
            <div className="aboutProduct__desc">
                {productInfos && productInfos[0].description}
            </div>
            <div className="aboutProduct__list row">
                {
                    allColors.map(color => (
                        <li key={color} className={`aboutProduct__border ${color === thisColor ? 'selected' : ''}`} onClick={() => setThisColor(color)}>
                            <div className="aboutProduct__color" style={{ backgroundColor: color }}></div>
                        </li>

                    ))
                }
            </div>
        </>
    )
}

export default AboutProduct;