import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import AboutProduct from '../../Components/AboutProduct/AboutProduct';
import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import ProductSpece from '../../Components/ProductSpece/ProductSpece';
import DetailBox from '../../Components/DetailBox/DetailBox';
import { BiChevronRight } from 'react-icons/bi'
import Services from '../../Components/Services/Services'
import FeatuesItem from '../../Components/FeatuesItem/FeatuesItem';
import AuthContext from '../../contexts/authContext';

import './Product.css'

function Product() {

    const param = useParams()
    const authContext = useContext(AuthContext)
    const [productInfos, setProductInfos] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    useEffect(() => {
        fetch(`https://tech-store-db.vercel.app/products?id=${param.productID}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setProductInfos(data.length ? data : null);
            })
    }, [param])

    const [btn1Props] = useState({
        type: 'filled-blue',
        value: 'Add to Cart'
    });
    const [btn2Props] = useState({
        type: 'filled-gold',
        to: '/',
        image: '/images/header/PayPal.svg'
    });
    const [btn3Props] = useState({
        type: 'filled-red',
        value: 'Remove From Cart',
        icon: "bag"
    });

    const [pageSections] = useState(["About Product", "Details", "Specs"]);
    const [thisPageSection, setThisPageSection] = useState("About Product");

    const [thisImageIndex, setThisImageIndex] = useState(0)
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(productInfos ? productInfos[0].images : []);
    }, [productInfos])

    const [selectedProductLength, setSelectedProductLength] = useState(1)

    useEffect(() => {

        if (productInfos) {
            let selectedProduct = authContext.userBasket.filter(product => {
                return product.productId === productInfos[0].id
            })

            if (selectedProduct.length) {
                setSelectedProductLength(selectedProduct[0].productCount)
            }
        }
    }, [productInfos])

    const changeProductCount = (e) => {
        setSelectedProductLength(e.target.value)
    }
    const changeProductCountArrow = (type) => {
        if (type === "add") {
            setSelectedProductLength(prevState => prevState + 1)
        } else {
            if (selectedProductLength > 1) {
                setSelectedProductLength(prevState => prevState - 1)
            }
        }
    }
    const addToBasket = (e) => {

        if (selectedProductLength <= productInfos[0].inventory) {
            let isInBasket = authContext.userBasket.some(product => product.productId === productInfos[0].id);
            if (isInBasket) {

                const userBasketCopy = [...authContext.userBasket];
                userBasketCopy.map(product => {
                    if (product.productId === productInfos[0].id) {
                        product.productCount = selectedProductLength
                    }
                })
                authContext.successToast("Product number changed.")

            } else {
                authContext.setUserBasket(prevState => {
                    return [...prevState, { productId: productInfos[0].id, productCount: selectedProductLength, productInfo: productInfos[0] }]
                })
                authContext.successToast("Added to cart.")
            }
        } else {
            authContext.errorToast("This number of products is unavailable.")
        }

    }
    const removeFromBasket = () => {
        const userBasketCopy = [...authContext.userBasket]
        const filteredBasket = userBasketCopy.filter(product => {
            return product.productId !== productInfos[0].id
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
                return [...prevState, { productId: infos.id, productInfo: productInfos[0] }]
            })
            authContext.successToast("added to wishlist.")
        }
    }
    return (
        <div className='product'>
            <div className="product-header">
                <div className="container">
                    <div className="product-header__wrapper">
                        <div className="product-header__side">
                            <ul className="product-header__list">
                                {
                                    pageSections.map(section => (
                                        <li key={section} className={`product-header__item ${section === thisPageSection ? 'active' : ''}`} onClick={() => setThisPageSection(section)}>
                                            {section}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="product-header__side product-header__options">
                            <p className="product-header__sale">
                                On Sale from
                                <span className="product-header__price">${((productInfos ? productInfos[0].price : 0) * selectedProductLength).toFixed(2)}</span>
                            </p>
                            <div className="product-header__container">
                                <div className="product-header__count">
                                    <input type="text" disabled={true} className="product-header__counter" value={selectedProductLength} onChange={(e) => changeProductCount(e)} />
                                    <div className="product-header__controls">
                                        <BiChevronUp onClick={() => changeProductCountArrow("add")} />
                                        <BiChevronDown onClick={() => changeProductCountArrow("mines")} />
                                    </div>
                                </div>
                                <Button {...btn1Props} onAction={() => addToBasket()} />
                            </div>
                            {
                                productInfos && authContext.userBasket.some(product => product.productId === productInfos[0].id) &&
                                <Button {...btn3Props} onAction={() => removeFromBasket()} />
                            }
                            <div className="product-header__paypal">
                                <Button {...btn2Props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-details">
                <div className="container">
                    <div className="product-datails__wrapper">
                        <div className='product-info'>
                            <div className="product-info__content">
                                <div className="bandcamp">
                                    <div className="bandcamp__wrapper">
                                        <span className="bandcamp__item">
                                            Home <BiChevronRight className='bandcamp__icon' />
                                        </span>
                                        <span className="bandcamp__item">
                                            {productInfos && productInfos[0].categoryInfos.type} <BiChevronRight className='bandcamp__icon' />
                                        </span>
                                        <span className="bandcamp__item last">
                                            {productInfos && productInfos[0].categoryInfos.serie}
                                        </span>
                                    </div>
                                </div>
                                <h1 className="product__title">
                                    {productInfos && productInfos[0].title}
                                </h1>
                                <div className="review">
                                    <span className="review-message">
                                        Be the first to review this product
                                    </span>
                                </div>
                                {
                                    thisPageSection === "About Product" &&
                                    <AboutProduct productInfos={productInfos} />
                                }
                                {
                                    thisPageSection === "Details" &&
                                    <ProductDetails productInfos={productInfos} />
                                }
                                {
                                    thisPageSection === "Specs" &&
                                    <ProductSpece productInfos={productInfos} />
                                }
                                <div className="product-info__section">
                                    <span className="product-info__question">
                                        Have a Question?
                                        <Link className="product-info__link" to='/contactus'>
                                            Contact Us
                                        </Link>
                                    </span>
                                    <span className="product-info__sku">
                                        {productInfos && productInfos[0].sku}
                                    </span>
                                </div>
                            </div>
                            <span className="product-info__more">
                                + More information
                            </span>
                        </div>
                        <div className="product-display">
                            <div className="product-actions">
                                <img src="/images/catalog/Group 106.svg" alt="Action Icon" className="cart-actions__img" onClick={() => addToWhishList(productInfos[0])} />
                                <img src="/images/catalog/Group 107.svg" alt="Action Icon" className="cart-actions__img" />
                                <img src="/images/catalog/Group 107-1.svg" alt="Action Icon" className="cart-actions__img" />
                            </div>
                            <div className="product-img">
                                <img src={`/images/products/${images.length ? images[thisImageIndex] : 'img-default.png'}`} alt="Product picture" className="product-img__src" />
                            </div>
                            <div className="quotation-pagination">
                                {
                                    images.map((img, index) => (
                                        <div key={img} className={`quotation-pagination__item ${index === thisImageIndex ? "active" : ''}`} onClick={() => setThisImageIndex(index)}></div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DetailBox>
                <div className="detail-box__content">
                    <h4 className="detail-box__title">
                        Outplay the Competittion
                    </h4>
                    <p className="detail-box__desc">
                        Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
                        <br /><br />
                        *Performance compared to i7-9700. Specs varies by model.
                    </p>
                </div>
                <div className="detail-box__img">
                    <img src="/images/boxes/Rectangle 11.png" alt="Box picture" className="detail-box__src" />
                </div>
            </DetailBox>
            <div className="product-help">
                <div className="container">
                    <div className="product-help__wrapper">
                        <ul className="product-help__list">
                            <li className="product-help__item">
                                <Link className='product-help__link'>
                                    Product Support
                                    <span>→</span>
                                </Link>
                            </li>
                            <li className="product-help__item">
                                <Link className='product-help__link'>
                                    FAQ
                                    <span>→</span>
                                </Link>
                            </li>
                            <li className="product-help__item">
                                <Link className='product-help__link'>
                                    Our Buyer Guide
                                    <span>→</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="product-help__img">
                            <img src="/images/boxes/image_22-removebg-preview.png" alt="Box picture" className="product-help__src" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="featues">
                <div className="container">
                    <div className="featues__wrapper">
                        <h3 className="featues__title">
                            Featues
                        </h3>
                        <span className="featues__desc">
                            The MPG series brings out the best in gamers by allowing full expression in color with advanced RGB lighting control and synchronization.
                        </span>
                        <div className="featues__items">
                            <FeatuesItem img='image 16.png'>
                                <span className="featuesItem__info_bold">Intel® Core™ i7</span> processor with the upmost computing power to bring you an unparalleled gaming experience.
                            </FeatuesItem>
                            <FeatuesItem img='image 17.png'>
                                The new <span className="featuesItem__info_bold">GeForce® RTX SUPER™</span> Series has more cores and higher clocks for superfast performance compared to previous-gen GPUs.
                            </FeatuesItem>
                            <FeatuesItem img='image 18.png'>
                                Unleash the full potential with the latest <span className="featuesItem__info_bold">SSD technology</span> , the NVM Express. 6 times faster than traditional SATA SSD.
                            </FeatuesItem>
                            <FeatuesItem img='image 19.png'>
                                Featuring the latest <span className="featuesItem__info_bold">10th Gen Intel® Core™</span> processors, memory can support up to DDR4 2933MHz to delivers an unprecedented gaming experience.
                            </FeatuesItem>
                        </div>
                    </div>
                </div>
            </div>
            <Services bgColor />
        </div>
    )
}
export default Product;