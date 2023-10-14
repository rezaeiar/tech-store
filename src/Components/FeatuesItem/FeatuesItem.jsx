import React from 'react'

import './FeatuesItem.css'

function FeatuesItem({ img, children }) {
    return (
        <div className='featuesItem'>
            <div className="featuesItem__img">
                <img src={`/images/boxes/${img}`} alt="Featues picture" className="featuesItem__src" />
            </div>
            <p className="featuesItem__info">
                {children}
            </p>
        </div>
    )
}

export default FeatuesItem
