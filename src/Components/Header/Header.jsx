import React from 'react'
import HeaderBar from './HeaderBar/HeaderBar'
import NavBar from './Navbar/Navbar'

import './header.css'

function Header() {
    return (
        <div className='header'>
            <HeaderBar />
            <NavBar />
        </div>
    )
}
export default Header;