import React from 'react'

import './OfferBanner.css'

function OfferBanner() {
    return (
        <div className='offer-banner'>
            <img src="/images/primary 1.svg" alt="Banner label" className='offer-banner__img' />
            <div className="offer-banner__line"></div>
            <div className='offer-banner__content'>
                <div className="offer-banner__text">
                    <span className='offer-banner__content_bold'>own</span>
                    it now, up to 6 months interest free
                </div>

                <a href="#" className='offer-banner__link'>learn more</a>
            </div>
        </div>
    )
}
export default OfferBanner