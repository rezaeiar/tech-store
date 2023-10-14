import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiBagSimple } from 'react-icons/pi'

import './Button.css'

const Button = ({ type, value, to, image, icon, customStyles, onAction }) => {

    const [btnCustomStyles] = useState(customStyles)

    const actionHandler = () => {

        onAction ? onAction() : null
    }
    return (
        <button className='button' style={btnCustomStyles ? btnCustomStyles : {}}>
            <Link to={to ? to : ''} className={`button__link ${type}`} onClick={actionHandler}>
                {
                    icon &&
                        icon === "bag"
                        ? <PiBagSimple className='button__icon' />
                        : ''
                }
                <span>
                    {value}
                </span>
                {
                    image &&
                    <img src={image} alt="Button icon" className='button__img' />
                }
            </Link>
        </button>
    )
}

export default Button