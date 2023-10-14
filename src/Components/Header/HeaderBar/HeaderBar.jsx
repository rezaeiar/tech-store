import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp, BiLogoFacebookSquare } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ShopInfo from '../../ShopInfo/ShopInfo'

import './HeaderBar.css'

function HeaderBar() {

    const [isShowShopInfo, setIsShowShopInfo] = useState(false);

    const shopInfoDisplayHandler = () => {

        setIsShowShopInfo(prevStatus => {
            return !prevStatus;
        })
    }
    return (
        <div className='header-bar'>
            <div className="container">
                <div className="header-bar__wrapper">
                    <span className="header-bar-available">
                        <div className="header-bar-available__wrapper" onClick={shopInfoDisplayHandler}>
                            <span className='header-bar-available__label'> Mon-Thu:</span>
                            <span className='header-bar-available__content'>9:00 AM - 5:30 PM</span>
                            {
                                isShowShopInfo
                                    ? <BiChevronUp className='header-bar-available__svg' />
                                    : <BiChevronDown className='header-bar-available__svg' />
                            }
                        </div>

                        {
                            isShowShopInfo &&
                            <ShopInfo />
                        }
                    </span>
                    <span className="header-bar-us">
                        <span className="header-bar-us__content">
                            Visit our showroom in 1234 Street Adress City Address, 1234
                        </span>
                        <Link to='/' className='header-bar-us__link'>Contact Us</Link>
                    </span>
                    <div className="header-bar-contact">
                        <p className="header-bar-contact__call">
                            Call Us: (00) 1234 5678
                        </p>
                        <a href="#" className='header-bar-contact__link' title='Instagram'>
                            <AiFillInstagram className='header-bar-contact__svg' />
                        </a>
                        <a href="#" className='header-bar-contact__link' title='Facebook'>
                            <BiLogoFacebookSquare className='header-bar-contact__svg' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderBar;