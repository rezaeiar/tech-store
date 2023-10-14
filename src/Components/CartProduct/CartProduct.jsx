import React, { useState, useContext, useEffect } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { RxPencil2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/authContext'

import './CartProduct.css'

function CartProduct(props) {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const [selectedProductLength, setSelectedProductLength] = useState(1)
    useEffect(() => {
        setSelectedProductLength(props.productCount)
    }, [])
    const changeProductCountArrow = (type, productId, inventory) => {
        if (type === "add") {
            if (selectedProductLength < inventory) {
                setSelectedProductLength(prevState => prevState + 1)
                const userBasketCopy = [...authContext.userBasket];
                userBasketCopy.map(product => {
                    if (product.productId === productId) {
                        product.productCount = selectedProductLength + 1
                    }
                })
                authContext.setUserBasket(userBasketCopy)
                authContext.successToast("Product number changed.")

            } else {
                authContext.errorToast("This number of products is unavailable.")
            }
        } else {
            if (selectedProductLength > 1) {
                setSelectedProductLength(prevState => prevState - 1)
                const userBasketCopy = [...authContext.userBasket];
                userBasketCopy.map(product => {
                    if (product.productId === productId) {
                        product.productCount = selectedProductLength - 1
                    }
                })
                authContext.setUserBasket(userBasketCopy)
                authContext.infoToast("Product number changed.")
            }
        }
    }
    const goToProduct = (productId) => {
        navigate(`/product/${productId}`)
    }
    const removeProductFromBasket = (productId) => {

        const userBasketCopy = [...authContext.userBasket]
        const filteredBasket = userBasketCopy.filter(product => {
            return product.productId !== productId
        })

        authContext.setUserBasket(filteredBasket)
        authContext.infoToast("Removed from cart.")
    }
    const changeProductCountNumber = (count, productId) => {
        setSelectedProductLength(count)
        const userBasketCopy = [...authContext.userBasket];
        userBasketCopy.map(product => {
            if (product.productId === productId) {
                product.productCount = count
            }
        })
        authContext.setUserBasket(userBasketCopy)
    }
    return (
        <div className="shoppingCart__product">
            <div className="shoppingCart__item half">
                <div className="shoppingCart__img">
                    <img src={`/images/products/${props.productInfo.images[0]}`} alt="Product Picture" className="shoppingCart__src" />
                </div>
                <p className='shoppingCart__desc'>
                    {
                        props.productInfo.description.slice(0, 100) + "..."
                    }
                </p>
            </div>
            <div className="shoppingCart__container">
                <p className="shoppingCart__item price">
                    ${props.productInfo.price.toFixed(2)}
                </p>
                <div className="shoppingCart__item">
                    <div className="shoppingCart__count">
                        <input type="text" className="shoppingCart__counter" disabled value={selectedProductLength} onChange={(e) => changeProductCountNumber(e.target.value, props.productId)} />
                        <div className="shoppingCart__controls">
                            <BiChevronUp onClick={() => changeProductCountArrow("add", props.productId, props.productInfo.inventory)} className='shoppingCart__icon' />
                            <BiChevronDown onClick={() => changeProductCountArrow("mines", props.productId, props.productInfo.inventory)} className='shoppingCart__icon' />
                        </div>
                    </div>
                </div>
                <p className="shoppingCart__item subtotal">
                    ${(props.productInfo.price * props.productCount).toFixed(2)}
                </p>
                <div className="shoppingCart__item">
                    <div className="shoppingCart__tools">
                        <AiOutlineCloseCircle onClick={() => removeProductFromBasket(props.productId)} className='shoppingCart__icon' />
                        <RxPencil2 onClick={() => goToProduct(props.productId)} className='shoppingCart__icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
