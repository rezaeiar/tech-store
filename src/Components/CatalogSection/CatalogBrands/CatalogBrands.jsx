import React, { useState, useEffect } from 'react'
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';

import './CatalogBrands.css'

function CatalogBrands() {

    const [btn1Props] = useState({
        type: 'outlined-gray',
        value: 'all brands',
        to: '/catalog/allTypes/Custome%20Builds+Asus+Lenovo+MSI/allSeries/allPrices/allColors',
        customStyles: {
            width: "100%"
        }
    });
    const [allBrands, setAllBrand] = useState([])
    useEffect(() => {
        fetch(`https://techstore-db.liara.run/brands`)
            .then(res => res.json())
            .then(brands => {
                setAllBrand(brands)
            })
    }, [])
    const goToTopHandler = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <div className='catalog-brands'>
            <div className="catalog-brands__head">
                <h4 className="catalog-brands__title">
                    Brands
                </h4>
                <Button {...btn1Props} onAction={goToTopHandler} />
            </div>
            <div className="catalog-brands__content">
                {
                    allBrands.slice(0, 6).map(brand => (
                        <div className="catalog-brands__item" key={brand.id} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <Link to={brand.link} className="catalog-brands__link">
                                <img src={`/images/header/${brand.image}`} alt="Brand picture" className="catalog-brands__src" />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CatalogBrands;