import React from 'react'

import './DetailBox.css'

function DetailBox({ children }) {
    return (
        <div className='detail-box'>
            <div className="container">
                <div className="detail-box__wrapper">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DetailBox;