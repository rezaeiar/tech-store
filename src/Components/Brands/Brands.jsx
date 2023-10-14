import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Brands.css'

function Brands() {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/brands')
            .then(res => res.json())
            .then(brand => {
                setBrands(brand)
            })
    }, [])
    return (
        <div className="brands">
            {
                brands.map(brand => (
                    <div key={brand.id} className="brands__item">
                        <Link to={brand.link} className='brands__link'>
                            <img src={`/images/brands/${brand.image}`} alt="Brand picture" className='brands__img' />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
export default Brands