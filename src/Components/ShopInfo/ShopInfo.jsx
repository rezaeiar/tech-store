import React from 'react'

import './ShopInfo.css'

function ShopInfo() {
    return (
        <div className='shop-info'>
            <div className="shop-info__section">
                <div className="section__wrapper">
                    <div className="shop-info__icon">
                        <img src="/images/header/bx_bx-time.svg" alt="Time icon" className="shop-info__src" />
                    </div>
                    <div className="shop-info__content">
                        <span className="shop-info__label">
                            We are open:
                        </span>
                        <p className="shop-info__info shop-info__info_bold">
                            <span className='shop-info__highlight'>Mon-Thu: </span>9:00 AM - 5:30 PM
                        </p>
                        <p className="shop-info__info shop-info__info_bold">
                            <span className='shop-info__highlight'>Fr: </span>9:00 AM - 6:00 PM
                        </p>
                        <p className="shop-info__info shop-info__info_bold">
                            <span className='shop-info__highlight'>Sat: </span>11:00 AM - 5:00 PM
                        </p>
                    </div>
                </div>
            </div>
            <div className="shop-info__section">
                <div className="section__wrapper">
                    <div className="shop-info__icon">
                        <img src="/images/header/bx_bx-location.svg" alt="Location icon" className="shop-info__src" />
                    </div>
                    <div className="shop-info__content">
                        <p className="shop-info__info">
                            <span className='shop-info__label'>Address:</span> 1234 Street Adress, City Address, 1234
                        </p>
                    </div>
                </div>
            </div>
            <div className="shop-info__section">
                <div className="section__wrapper">
                    <div className="shop-info__content">
                        <p className="shop-info__info">
                            <span className='shop-info__label'>Phones:</span> <span className="shop-info__address">(00) 1234 5678</span>
                        </p>
                        <p className="shop-info__info">
                            <span className='shop-info__label'>E-mail:</span> <span className="shop-info__address">shop@email.com</span> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShopInfo;