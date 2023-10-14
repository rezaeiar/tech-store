import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../../contexts/authContext'

import './CatalogMyWishList.css'

function CatalogMyWishList() {
    const authContext = useContext(AuthContext)
    return (
        <div className='catalog-mywishlist'>
            <div className="catalog-mywishlist__head">
                <h4 className="catalog-mywishlist__title">
                    My Wish List
                </h4>
            </div>
            <div className="catalog-mywishlist__content">
                {
                    authContext.wishList.length ? (
                        <ul className="catalog-mywishlist__list">
                            {
                                authContext.wishList.map(product => (
                                    <li className="catalog-mywishlist__item" key={product.productId}>
                                        <Link to={`/product/${product.productId}`} className='catalog-mywishlist__link'>
                                            <img src={`/images/products/${product.productInfo.images[0]}`} alt="Product prcture" className='catalog-mywishlist__img' />
                                            <div className="catalog-mywishlist__wrapper">
                                                <h1 className="catalog-mywishlist__desc">
                                                    {product.productInfo.title}
                                                </h1>
                                                <span className="catalog-mywishlist__serie">
                                                    {product.productInfo.categoryInfos.serie}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <span className="catalog-mywishlist__message">
                            You have no items in your wish list.
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default CatalogMyWishList;