import React, { useState } from 'react'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { BiChevronDown, BiChevronUp, BiLogoFacebookSquare } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'

import './Footer.css'

function Footer() {
    const [informationDisplay, setInformationDisplay] = useState(false);
    const [PCPartsDisplay, setPCPartsDisplay] = useState(false);
    const [desktopPCsDisplay, setDesktopPCsDisplay] = useState(false);
    const [laptopsDisplay, setLaptopsDisplay] = useState(false);
    const [addressDisplay, setAddressDisplay] = useState(false);
    const [btn1Props] = useState({
        type: 'filled-blue',
        value: 'our deals'
    });
    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__section footer__section_head">
                        <div className="footer__left">
                            <h4 className="footer__title">
                                Sign Up To Our Newsletter.
                            </h4>
                            <p className="footer__text">
                                Be the first to hear about the latest offers.
                            </p>
                        </div>
                        <div className="footer__right">
                            <input type="text" className='footer__search' placeholder='Your Email' />
                            <Button {...btn1Props} />
                        </div>
                    </div>
                    <div className="footer__section footer__section_middle">
                        <div className="footer-box">
                            <h4 className="footer-box__title" onClick={() => setInformationDisplay(prev => !prev)}>
                                Information
                                {
                                    informationDisplay
                                        ? <BiChevronUp className='footer-box__icon' />
                                        : <BiChevronDown className='footer-box__icon' />
                                }
                            </h4>
                            <ul className={`footer-box__list ${!informationDisplay ? "non-active" : ""}`}>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='aboutus'>
                                        About Us
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        About Zip
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Search
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Terms
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Orders and Returns
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='contactus'>
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Advanced Search
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Newsletter Subscription
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-box">
                            <h4 className="footer-box__title" onClick={() => setPCPartsDisplay(prev => !prev)}>
                                PC Parts
                                {
                                    PCPartsDisplay
                                        ? <BiChevronUp className='footer-box__icon' />
                                        : <BiChevronDown className='footer-box__icon' />
                                }
                            </h4>
                            <ul className={`footer-box__list ${!PCPartsDisplay ? "non-active" : ""}`}>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        CPUS
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Add On Cards
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Hard Drives (Internal)
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Graphic Cards
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Keyboards / Mice
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Cases / Power Supplies / Cooling
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        RAM (Memory)
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Software
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Speakers / Headsets
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Motherboards
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-box">
                            <h4 className="footer-box__title" onClick={() => setDesktopPCsDisplay(prev => !prev)}>
                                Desktop PCs
                                {
                                    desktopPCsDisplay
                                        ? <BiChevronUp className='footer-box__icon' />
                                        : <BiChevronDown className='footer-box__icon' />
                                }
                            </h4>
                            <ul className={`footer-box__list ${!desktopPCsDisplay ? "non-active" : ""}`}>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='/catalog/allTypes/Custome%20Builds/allSeries/allPrices/allColors'>
                                        Custom PCs
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Servers
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        MSI All-In-One PCs
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        HP/Compaq PCs
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='/catalog/desktop/Asus/allSeries/allPrices/allColors'>
                                        ASUS PCs
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Tecs PCs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-box">
                            <h4 className="footer-box__title" onClick={() => setLaptopsDisplay(prev => !prev)}>
                                Laptops
                                {
                                    laptopsDisplay
                                        ? <BiChevronUp className='footer-box__icon' />
                                        : <BiChevronDown className='footer-box__icon' />
                                }
                            </h4>
                            <ul className={`footer-box__list ${!laptopsDisplay ? "non-active" : ""}`}>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Evryday Use Notebooks
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='/catalog/allTypes/MSI/allSeries/allPrices/allColors'>
                                        MSI Workstation Series
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link" to='/catalog/allTypes/MSI/allSeries/allPrices/allColors'>
                                        MSI Prestige Series
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Tablets and Pads
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Netbooks
                                    </Link>
                                </li>
                                <li className="footer-box__item">
                                    <Link className="footer-box__link">
                                        Infinity Gaming Notebooks
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-box">
                            <h4 className="footer-box__title" onClick={() => setAddressDisplay(prev => !prev)}>
                                Address
                                {
                                    addressDisplay
                                        ? <BiChevronUp className='footer-box__icon' />
                                        : <BiChevronDown className='footer-box__icon' />
                                }
                            </h4>
                            <ul className={`footer-box__list ${!addressDisplay ? "non-active" : ""}`}>
                                <li className="footer-box__item">
                                    Address: 1234 Street Adress City Address, 1234
                                </li>
                                <li className="footer-box__item">
                                    Phones:
                                    <a href="#" className='footer-box__address'>
                                        (00) 1234 5678
                                    </a>
                                </li>
                                <li className="footer-box__item">
                                    We are open: Monday-Thursday: 9:00 AM - 5:30 PM
                                </li>
                                <li className="footer-box__item">
                                    Friday: 9:00 AM - 6:00 PM
                                </li>
                                <li className="footer-box__item">
                                    Saturday: 11:00 AM - 5:00 PM
                                </li>
                                <li className="footer-box__item">
                                    E-mail:
                                    <a href="#" className='footer-box__address'>
                                        shop@email.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__section footer__section_footer">
                        <div className="footer-media">
                            <a href="#" className='footer-media__link' title='Instagram'>
                                <AiFillInstagram className='footer-media__svg' />
                            </a>
                            <a href="#" className='footer-media__link' title='Facebook'>
                                <BiLogoFacebookSquare className='footer-media__svg' />
                            </a>
                        </div>
                        <div className="footer-paiement">
                            <img src="/images/paiement/paypal.png" alt="Paiement picture" className="footer-paiement__img" />
                            <img src="/images/paiement/visa.png" alt="Paiement picture" className="footer-paiement__img" />
                            <img src="/images/paiement/maestro.png" alt="Paiement picture" className="footer-paiement__img" />
                            <img src="/images/paiement/discover.png" alt="Paiement picture" className="footer-paiement__img" />
                            <img src="/images/paiement/american-express.png" alt="Paiement picture" className="footer-paiement__img" />
                        </div>
                        <p className="footer-copyright">
                            Copyright © 2020 Shop Pty. Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer