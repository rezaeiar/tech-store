import React from 'react'

import './Service.css'

function Service({icon, title, info}) {
    return (
        <div className='service'>
            <div className="service__icon">
                <img src={`/images/header/${icon}`} alt="" className="service__src" />
            </div>
            <div className="service__content">
                <h4 className="service__title">
                    {title}
                </h4>
                <p className="service__info">
                    {info}
                </p>
            </div>
        </div>
    )
}
export default Service;