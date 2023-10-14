import React, { useState, useEffect, useContext, useMemo } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import Button from '../../Components/Button/Button'
import CartProduct from '../../Components/CartProduct/CartProduct'
import AuthContext from '../../contexts/authContext'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import Input from '../../Components/Input/Input'
import { Link } from 'react-router-dom'

import './ShoppingCart.css'

function ShoppingCart() {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    const [btn1Props] = useState({
        type: 'outlined-gray',
        value: 'Continue Shopping',
    });
    const [btn2Props] = useState({
        type: 'filled-dark',
        value: 'Clear Shopping Cart',
    });
    const [btn3Props] = useState({
        type: 'filled-dark',
        value: 'Update Shopping Cart',
    });
    const [btn4Props] = useState({
        type: 'filled-blue',
        value: 'Proceed to Checkout',
        customStyles: {
            width: "100%",
            marginBottom: "14px"
        }
    });
    const [btn5Props] = useState({
        type: 'filled-gold',
        value: 'Check out with',
        image: '/images/header/PayPal.svg',
        customStyles: {
            width: "100%",
            marginBottom: "14px"
        }
    });
    const [btn6Props] = useState({
        type: 'outlined-gray',
        value: 'Check Out with Multiple Addresses',
        customStyles: {
            width: "100%",
        }
    });

    const [showDiscount, setShowDiscount] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)

    useMemo(() => {

        let totalPrice = 0;
        let inDiscount = 0;
        authContext.userBasket.forEach((product) => {
            totalPrice += (product.productInfo.price * product.productCount)
            inDiscount += (((product.productInfo.price * product.productInfo.discount) / 100) * product.productCount);
        })

        setSubtotal(totalPrice)
        setDiscount(inDiscount)
    }, [authContext.userBasket])

    const continueShopping = () => {
        authContext.infoToast("We are completing this section.");
    }
    const clearBasket = () => {
        authContext.setUserBasket([])
        authContext.infoToast("Cart cleared.");
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const updateBasket = () => {
        authContext.successToast("Changes applied.");
    }
    const goToCheckbox = () => {
        authContext.infoToast("We are completing this section.");
    }
    return (
        <div className='shoppingCart'>
            <div className="container">
                <div className="bandcamp">
                    <div className="bandcamp__wrapper">
                        <span className="bandcamp__item">
                            Home <BiChevronRight className='bandcamp__icon' />
                        </span>
                        <span className="bandcamp__item">
                            Shopping Cart
                        </span>
                    </div>
                </div>
                {
                    authContext.userBasket.length ? (
                        <>
                            <h4 className="shoppingCart__title">
                                Shopping Cart
                            </h4>
                            <div className="shoppingCart__wrapper">
                                <div className="shoppingCart__main">
                                    <div className="shoppingCart__list head">
                                        <div className="shoppingCart__content">
                                            <span className="shoppingCart__item half">
                                                Item
                                            </span>
                                            <div className="shoppingCart__container">
                                                <span className="shoppingCart__item">
                                                    Price
                                                </span>
                                                <span className="shoppingCart__item">
                                                    Qty
                                                </span>
                                                <span className="shoppingCart__item subtotal">
                                                    Subtotal
                                                </span>
                                                <span className="shoppingCart__item"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shoppingCart__list">
                                        {
                                            authContext.userBasket.map(product => (
                                                <CartProduct key={product.productId} {...product} />
                                            ))
                                        }
                                    </div>
                                    <div className="shoppingCart__actions">
                                        <div className="shoppingCart__box">
                                            <Button {...btn1Props} onAction={continueShopping} />
                                            <div className="shoppingCart__clearbtn">
                                                <Button {...btn2Props} onAction={clearBasket} />
                                            </div>
                                        </div>
                                        <Button {...btn3Props} onAction={updateBasket} />
                                    </div>
                                </div>
                                <div className="summary">
                                    <div className="summary-box">
                                        <h4 className="summary__title">
                                            Summary
                                        </h4>
                                        <div className="summary__box" onClick={() => setShowDiscount(prevState => !prevState)}>
                                            <div className="summary-wrapper">
                                                <h5 className="summary-wrapper__title">
                                                    Apply Discount Code
                                                </h5>
                                            </div>
                                            {
                                                showDiscount
                                                    ? <BiChevronUp />
                                                    : <BiChevronDown />
                                            }
                                        </div>
                                        {
                                            !!showDiscount &&
                                            <div className="summary-wrapper__input">
                                                <Input label='Enter discount code' full>
                                                    Enter Discount code
                                                </Input>
                                            </div>
                                        }
                                    </div>
                                    <div className="summary-box summary-box_last">
                                        <div className="summary-box__content">
                                            <span className="summary-box__label">
                                                Subtotal
                                            </span>
                                            <span className="summary-box__value">
                                                ${subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="summary-box__content">
                                            <span className="summary-box__label">
                                                Discount amount
                                            </span>
                                            <span className="summary-box__value">
                                                ${discount.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="summary-box__content">
                                            <span className="summary-box__label">
                                                Order Total
                                            </span>
                                            <span className="summary-box__value summary-box__value_bold">
                                                ${(subtotal - discount).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button {...btn4Props} onAction={goToCheckbox} />
                                    <Button {...btn5Props} />
                                    <Button {...btn6Props} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="shoppingCart-empty">
                            <h4 className='shoppingCart-empty__title'>
                                Your shopping cart is empty
                            </h4>
                            <Link to='/catalog/allTypes/allBrands/allSeries/allPrices/allColors' className='shoppingCart-empty__link'>
                                Let's go shopping
                            </Link>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default ShoppingCart;