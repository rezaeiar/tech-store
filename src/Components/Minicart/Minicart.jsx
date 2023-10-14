import React, { useState, useContext, useMemo } from 'react'
import Button from '../Button/Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { RxPencil2 } from 'react-icons/rx'
import AuthContext from '../../contexts/authContext'
import { Link } from 'react-router-dom'

import './Minicart.css'

function Minicart() {
    const { userBasket } = useContext(AuthContext);
    const authContext = useContext(AuthContext);

    const [btn1Props] = useState({
        type: 'outlined-blue',
        value: 'view or edit your cart',
        to: '/shopping-cart',
        customStyles: {
            width: "100%"
        }
    });
    const [btn2Props] = useState({
        type: 'filled-blue',
        value: 'Go to Checkout',
        to: '/shopping-cart',
        customStyles: {
            width: "100%", marginBottom: "8px"
        }
    });
    const [btn3Props] = useState({
        type: 'filled-gold',
        value: 'Check out with',
        to: '/shopping-cart',
        image: '/images/header/PayPal.svg',
        customStyles: {
            width: "100%"
        }
    });
    const [subtotal, setSubtotal] = useState(0)

    useMemo(() => {

        let totalPrice = 0;
        userBasket.forEach((product) => {
            totalPrice += (product.productInfo.price * product.productCount)
        })

        setSubtotal(totalPrice)
    }, [userBasket])

    const removeFromBasket = (productId) => {
        const userBasketCopy = [...userBasket]
        const filteredBasket = userBasketCopy.filter(product => {
            return product.productId !== productId
        })

        authContext.setUserBasket(filteredBasket)
        authContext.infoToast("Removed from cart.")

    }
    return (
        <div className='minicart'>
            <div className="minicart-triangle"></div>
            <div className="minicart__section minicart__header">
                <h3 className="minicart__title">
                    My Cart
                </h3>
                <span className="minicart__count">
                    {
                        userBasket.length
                            ? `${userBasket.length} item in cart`
                            : 'There are no items in the shopping cart'
                    }
                </span>
                <Button {...btn1Props} />
            </div>
            {
                !!userBasket.length &&
                <div className="minicart__section">
                    {
                        userBasket.slice().reverse().slice(0, 2).map(product => (
                            <div className="minicart-product" key={product.productId}>
                                <div className="minicart-product__wrapper">
                                    <div className="minicart-product__section minicart-product__count">
                                        {product.productCount}x
                                    </div>
                                    <div className="minicart-product__section minicart-product__content">
                                        <div className="minicart-product__img">
                                            <img src={`/images/products/${product.productInfo.images[0]}`} alt="Product picture" className="minicart-product__src" />
                                        </div>
                                        <p className="minicart-product__title">
                                            {
                                                product.productInfo.description.slice(0, 60)
                                            }
                                            ...
                                        </p>
                                    </div>
                                    <div className="minicart-product__section minicart-product__tools">
                                        <AiOutlineCloseCircle onClick={() => removeFromBasket(product.productId)} className='minicart-product__icon' />
                                        <Link to={`/product/${product.productId}`} className='minicart-product__link'>
                                            <RxPencil2 />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            {
                userBasket.length > 2 &&
                <span className='minicart__other'>
                    and {userBasket.length - 2} other items
                </span>
            }
            {
                !!userBasket.length &&
                <div className="minicart__section minicart__footer">
                    <div className="minicart-price">
                        <span className="minicart-price__title">
                            Subtotal:
                        </span>
                        ${subtotal.toFixed(2)}
                    </div>
                    <Button {...btn2Props} />
                    <Button {...btn3Props} />
                </div>

            }
        </div>
    )
}

export default Minicart