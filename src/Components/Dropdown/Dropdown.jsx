import React from 'react'
import { useState } from 'react';

import './Dropdown.css'

function Dropdown({ items, currentItem, setCurrent }) {

    const changeDropdownItem = (item) => {

        setCurrent(item)
    }
    return (
        <div className='dropdown'>
            {
                items.map(item => (
                    <div className={`dropdown__item ${currentItem === item ? "active" : ''}`} key={item} onClick={() => changeDropdownItem(item)}>
                        {item}
                    </div>
                ))
            }
        </div>
    )
}
export default Dropdown;