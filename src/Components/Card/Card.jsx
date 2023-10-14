import React, { useState } from 'react'
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import Button from '../Button/Button'
import usePercentage from '../../hooks/usePercentage'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../contexts/authContext'

import './Card.css'

function Card(props) {
    const authContext = useContext(AuthContext);

    const [btn1Props] = useState({
        type: 'outlined-blue',
        value: 'Add To Cart',
        icon: "bag",
        customStyles: {
            width: "100%"
        }
    });
    const [btn2Props] = useState({
        type: 'filled-red',
        value: 'Remove From Cart',
        icon: "bag",
        customStyles: {
            width: "100%"
        }
    });
    const [starsCounter] = useState([0, 1, 2, 3, 4])

    const addToBasket = (e) => {

        if (props.inventory) {

            authContext.setUserBasket(prevState => {
                return [...prevState, { productId: props.id, productCount: 1, productInfo: props }]
            })
            authContext.successToast("Added to cart.")
        } else {
            authContext.errorToast("This product is not available.")
        }

    }
    const removeFromBasket = () => {
        const userBasketCopy = [...authContext.userBasket]
        const filteredBasket = userBasketCopy.filter(product => {
            return product.productId !== props.id
        })

        authContext.setUserBasket(filteredBasket)
        authContext.infoToast("Removed from cart.")
    }
    const addToWhishList = (infos) => {
        let isInWishList = authContext.wishList.some(product => product.productId === infos.id);
        if (isInWishList) {

            const userWishListCopy = [...authContext.wishList]
            const filteredWishList = userWishListCopy.filter(product => {
                return product.productId !== infos.id
            })

            authContext.setWishList(filteredWishList)
            authContext.infoToast("removed from wishlist.")
        } else {
            authContext.setWishList(prevState => {
                return [...prevState, { productId: infos.id, productInfo: infos }]
            })
            authContext.successToast("added to wishlist.")
        }
    }
    return (
        <div className={`card${props.staticCard ? ' static' : ''}${props.list ? ' list' : ''}`}>

            <div className="card__header">
                {
                    props.inventory
                        ? (
                            <div className="card__inventory card__inventory_available">
                                <AiFillCheckCircle />
                                in stock
                            </div>
                        )
                        : (
                            <div className="card__inventory card__inventory_unavailable">
                                <FaPhoneSquareAlt />
                                check availability
                            </div>
                        )
                }

                <Link className="card__img" to={`/product/${props.id}`}>
                    <img src={`/images/products/${props.images ? props.images[0] : ''}`} alt="Product picture" className="card__src" />
                </Link>
                <div className="card__feedback">
                    <div className="card__stars">
                        {
                            starsCounter.map(star => (
                                star < props.score
                                    ? <AiFillStar className="card__star filled" key={star} />
                                    : <AiFillStar className="card__star" key={star} />
                            ))
                        }
                    </div>
                    <span className="card__reviews">
                        Reviews ({props.reviews})
                    </span>
                </div>
            </div>
            <div className="card__content">
                <span className="card__sku">
                    {props.sku}
                </span>
                <p className="card__title">
                    <Link to={`/product/${props.id}`} className='card__title' >
                        {
                            // Shorten product description
                            props.description ? (
                                props.list
                                    ? props.description
                                    : props.description.slice(0, 60) + "..."
                            ) : ""
                        }
                    </Link>
                </p>
                <div className="card-price-box">
                    {
                        // to calculate the price
                        props.discount
                            ? (

                                <>
                                    <p className="card-price-box__price card-price-box__original">
                                        {`$${props.price ? props.price.toFixed(2) : 0}`}
                                    </p>
                                    <p className="card-price-box__price card-price-box__final">
                                        ${usePercentage(props.price, props.discount)}
                                    </p>
                                </>
                            )
                            : (
                                <p className="card-price-box__price card-price-box__final">
                                    {`$${props.price ? props.price.toFixed(2) : 0}`}
                                </p>
                            )
                    }
                </div>
                <div className="card__button">
                    {
                        authContext.userBasket.some(product => product.productId === props.id) ? (
                            <Button {...btn2Props} onAction={removeFromBasket} />
                        ) : (
                            <Button {...btn1Props} onAction={addToBasket} />
                        )
                    }
                </div>
            </div>
            <ul className="card-list">
                {
                    props.spece.map(spece => (
                        <li className="card-list__item" key={spece.key}>
                            <div className="card-list__key">
                                {spece.key}
                            </div>
                            <div className="card-list__value">
                                {spece.value}
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className="cart-actions">
                <img src="/images/catalog/Group 106.svg" alt="Action Icon" className="cart-actions__img" onClick={() => addToWhishList(props)} />
                <img src="/images/catalog/Group 107.svg" alt="Action Icon" className="cart-actions__img" />
                <img src="/images/catalog/Group 107-1.svg" alt="Action Icon" className="cart-actions__img" />
            </div>
        </div>
    )
}
export default Card