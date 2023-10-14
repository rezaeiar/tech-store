import React from 'react'
import { Link } from 'react-router-dom'
import ProductsSlider from '../ProductsSlider/ProductsSlider'

import './ProductsSection.css'

function ProductsSection({ children, bannerTitle, bannerImg, bannerLink, fullwidth, uniqueID, products }) {
    return (
        <div className='products-section'>
            <div className="container">
                <div className="products-section__wrapper">
                    <div className="products-section__header">
                        {
                            children && children
                        }
                    </div>
                    <div className="products-section__content">
                        {
                            bannerTitle &&
                            <div className="products-section-banner" style={{ background: `url(${bannerImg})` }}>
                                <h2 className="products-section-banner__title">
                                    {bannerTitle}
                                </h2>
                                <Link to={bannerLink} className='products-section-banner__link'>
                                    See All Products
                                </Link>
                            </div>
                        }
                        <ProductsSlider fullwidth={fullwidth} uniqueID={uniqueID} products={products ? products : []} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductsSection;

// این کامپوننت ترتیب چایلد هاش اوکی شه