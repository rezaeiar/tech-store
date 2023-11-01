import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { BiSearch, BiChevronRight } from 'react-icons/bi'
import { PiBagSimple, PiUserCircle } from 'react-icons/pi'
import { IoMdClose } from 'react-icons/io'
import Account from '../Account/Account'
import Minicart from '../Minicart/Minicart'
import HoveredMenu from '../HoveredMenu/HoveredMenu'
import AuthContext from '../../contexts/authContext'
import { FaUserCircle } from 'react-icons/fa'

import './NavBar.css'

function NavBar() {
    const authContext = useContext(AuthContext)

    const [isShowSearchBox, setIsShowSearchBox] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowAccount, setIsShowAccount] = useState(false);
    const [isShowMinicart, setIsShowMinicart] = useState(false);
    const [btn1Props] = useState({
        type: 'outlined-blue',
        value: 'contact us',
        to: '/contactus'
    });

    const [serachValue, setSearchValue] = useState('')

    const searchBoxDisplayHandler = () => {

        setIsShowSearchBox(prevStatus => {
            return !prevStatus
        })
    }

    const menuDisplayHandler = (isShow) => {

        setIsShowMenu(isShow)
    }

    const accountDisplayHandler = (inShow) => {

        setIsShowAccount(inShow)
    }

    const minicartDisplayHandler = (isShow) => {

        setIsShowMinicart(isShow)
    }
    const serachProducts = () => {
        authContext.setIsShowSearch(true);

        let filteredProducts = []
        fetch(`https://tech-store-db.vercel.app/products`)
            .then(res => res.json())
            .then(products => {
                filteredProducts = products.filter(product => {
                    if (product.title.toLowerCase().includes(serachValue.toLowerCase())) {
                        return product;
                    }
                })
                authContext.setSearchItems(filteredProducts)
            })
    }

    const changeInputValue = e => {
        if (e.keyCode === 13) {
            serachProducts()
        }
    }
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='navbar__wrapper'>
                    <div className='navbar__section navbar__section_left'>
                        <div className='navbar-logo'>
                            <Link to='/' className='navbar-logo__link'>
                                <img src='/images/header/logo.svg' alt='Site logo' className='navbar-logo__img' />
                            </Link>
                        </div>
                        <div className="navbar-menu" onClick={() => menuDisplayHandler(true)}>
                            <img src="/images/header/menu.svg" alt="Menu icon" className='navbar-menu__icon' />
                        </div>
                        <div className={`navbar-search${isShowSearchBox ? ' show' : ''}`}>
                            <input type="text" className="navbar-search__input" value={serachValue} onChange={e => setSearchValue(e.target.value)} placeholder='Search entiere store here...' onKeyDown={e => changeInputValue(e)} />
                            <BiSearch className='navbar-search__img' onClick={() => serachProducts()} />
                        </div>
                        <div className={`${isShowMenu ? 'responsive-show' : ''} navbar-nav${isShowSearchBox ? '' : ' show'}`}>
                            <div className="navbar-nav__header">
                                <div className="navbar-nav-logo" onClick={() => setIsShowMenu(false)}>
                                    <Link to='/' className="navbar-nav-logo__link">
                                        <img src="/images/header/logo.svg" alt="Site logo" />
                                    </Link>
                                </div>
                                <div className="navbar-nav__icon" onClick={() => menuDisplayHandler(false)}>
                                    <IoMdClose className='navbar-nav__close' />
                                </div>
                            </div>
                            <ul className='navbar-nav__list'>
                                <li className='navbar-nav__item' onClick={() => setIsShowMenu(false)}>
                                    <Link to='/catalog/laptop/allBrands/allSeries/allPrices/allColors' className='navbar-nav__link'>
                                        Laptops
                                        <BiChevronRight className='navbar-nav-icon__right' />
                                    </Link>
                                </li>
                                <li className='navbar-nav__item' onClick={() => setIsShowMenu(false)}>
                                    <Link to='/catalog/desktop/allBrands/allSeries/allPrices/allColors' className='navbar-nav__link'>
                                        Desktop PCs
                                        <BiChevronRight className='navbar-nav-icon__right' />
                                    </Link>
                                </li>
                                <li className='navbar-nav__item' onClick={() => setIsShowMenu(false)}>
                                    <Link to='/catalog/allTypes/MSI/allSeries/allPrices/allColors' className='navbar-nav__link'>
                                        MSI Series
                                        <BiChevronRight className='navbar-nav-icon__right' />
                                    </Link>
                                </li>
                                <li className='navbar-nav__item' onClick={() => setIsShowMenu(false)}>
                                    <Link to='/catalog/allTypes/Custome Builds/allSeries/allPrices/allColors' className='navbar-nav__link'>
                                        Custome Builds
                                        <BiChevronRight className='navbar-nav-icon__right' />
                                    </Link>
                                </li>
                                <li className='navbar-nav__item' onClick={() => setIsShowMenu(false)}>
                                    <Link to='/catalog/allTypes/allBrands/allSeries/allPrices/allColors' className='navbar-nav__link'>
                                        All Other Products
                                        <BiChevronRight className='navbar-nav-icon__right' />
                                    </Link>
                                </li>
                                <HoveredMenu />
                            </ul>
                            <Button {...btn1Props} onAction={() => setIsShowMenu(false)} />
                        </div>
                    </div>
                    <div className="navbar__section">
                        <div className="navbar-search__icon navbar-icon">
                            <div className="navbar-icon__wrapper" onClick={searchBoxDisplayHandler}>
                                {
                                    isShowSearchBox ? <IoMdClose className='navbar-search__close' /> : <BiSearch />
                                }
                            </div>
                        </div>
                        <div className="navbar-cart__icon navbar-icon" onMouseEnter={() => minicartDisplayHandler(true)} onMouseLeave={() => minicartDisplayHandler(false)}>
                            <div className="navbar-icon__wrapper navbar-icon__wrapper_link">
                                <Link to='/shopping-cart' className='navbar-icon__link'>
                                    <PiBagSimple />
                                    {
                                        !!authContext.userBasket.length &&
                                        <span className="navbar-cart__count">
                                            {authContext.userBasket.length}
                                        </span>
                                    }
                                </Link>
                            </div>
                            {
                                isShowMinicart &&
                                <Minicart />
                            }
                        </div>
                        <div className="navbar-account navbar-icon" onMouseEnter={() => accountDisplayHandler(true)} onMouseLeave={() => accountDisplayHandler(false)}>
                            <div className="navbar-icon__wrapper">
                                <FaUserCircle className='navbar-account__img' />
                                <PiUserCircle className='navbar-account__icon' />
                            </div>
                            {
                                isShowAccount &&
                                <Account />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavBar;