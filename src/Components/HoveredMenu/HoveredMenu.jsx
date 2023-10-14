import React, { useState, useEffect } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import Brands from '../Brands/Brands'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'

import './HoveredMenu.css'

function HoveredMenu() {

    const [produitsPopulaires, setProduitsPopulaires] = useState([])
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {

        fetch('http://localhost:3000/products?score=5')
            .then(res => res.json())
            .then(result => {
                setProduitsPopulaires(result)
            })
    }, [])
    const hideMenu = () => {
        setShowMenu(false)
        setTimeout(() => {
            setShowMenu(true)
        }, 500);
    }
    return (
        <div className='hovered-menu' onClick={hideMenu} style={!showMenu ? { visibility: "hidden", opacity: "0" } : {}}>
            <div className="hovered-menu__content">
                <ul className="hovered-menu__list">
                    <li className="hovered-menu__item">
                        <Link className='hovered-menu__link' to='/catalog/laptop/MSI/allSeries/allPrices/allColors'>
                            MSI Laptop Series
                            <BiChevronRight />
                        </Link>
                        <div className="hovered-submenu">
                            <ul className="hovered-submenu__list">
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/laptop/MSI/MSI Raider GE78/allPrices/allColors'>
                                        MSI Raider GE78
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/laptop/MSI/MSI GE Series/allPrices/allColors'>
                                        MSI GE Series
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/laptop/MSI/MSI GT Series/allPrices/allColors'>
                                        MSI GT Series
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/laptop/MSI/MSI GS Series/allPrices/allColors'>
                                        MSI GS Series
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/laptop/MSI/MSI GL Series/allPrices/allColors'>
                                        MSI GL Series
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="hovered-menu__item">
                        <Link className='hovered-menu__link' to='/catalog/laptop/MSI/allSeries/allPrices/allColors'>
                            MSI Desktop Series
                            <BiChevronRight />
                        </Link>
                        <div className="hovered-submenu">
                            <ul className="hovered-submenu__list">
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/MSI/MSI GL Series/allPrices/allColors'>
                                        MSI GL Series
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/MSI/MSI Infinute Series/allPrices/allColors'>
                                        MSI Infinute Series
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="hovered-menu__item">
                        <Link className="hovered-menu__link" to='/catalog/allTypes/Custome Builds/allSeries/allPrices/allColors'>
                            Custome Builds
                            <BiChevronRight />
                        </Link>
                        <div className="hovered-submenu">
                            <ul className="hovered-submenu__list">
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/Custome Builds/Charlie V6/allPrices/allColors'>
                                        Charlie V6
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/Custome Builds/BRAVO V6/allPrices/allColors'>
                                        BRAVO V6
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/Custome Builds/ALPHA V6/allPrices/allColors'>
                                        ALPHA V6
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/Custome Builds/ZULU V6/allPrices/allColors'>
                                        ZULU V6
                                    </Link>
                                </li>
                                <li className="hovered-submenu__item">
                                    <Link className='hovered-submenu__link' to='/catalog/desktop/Custome Builds/DELTA V6/allPrices/allColors'>
                                        DELTA V6
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="hovered-menu__item">
                        <Link className="hovered-menu__link" to='/catalog/allTypes/Asus/allSeries/allPrices/allColors'>
                            Asus Series
                        </Link>
                    </li>
                    <li className="hovered-menu__item">
                        <Link className="hovered-menu__link" to='/catalog/allTypes/Lenovo/allSeries/allPrices/allColors'>
                            Lenovo Series
                        </Link>
                    </li>
                    <li className="hovered-menu__item">
                        <Link className="hovered-menu__link" to='/catalog/Gaming Monitor/allBrands/allSeries/allPrices/allColors'>
                            Gaming Monitor
                        </Link>
                    </li>
                </ul>
                <div className="hovered-menu__products">
                    {
                        produitsPopulaires.slice(0, 4).map(product => (
                            <Card key={product.id} {...product} />
                        ))
                    }
                </div>

            </div>
            <Brands />
        </div>
    )
}

export default HoveredMenu;