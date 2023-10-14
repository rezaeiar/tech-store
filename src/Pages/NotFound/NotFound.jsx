import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'

import './NotFound.css'

function NotFound() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    return (
        <div className='notFound'>
            <div className="container">
                <div className="notFound__wrapper">
                    <div className="bandcamp">
                        <div className="bandcamp__wrapper">
                            <span className="bandcamp__item">
                                Home <BiChevronRight className='bandcamp__icon' />
                            </span>
                            <span className="bandcamp__item">
                                404
                            </span>
                        </div>
                    </div>
                    <div className="notFound-empty">
                        <h4 className='notFound-empty__title'>
                            404: The requested page could not be found
                        </h4>
                        <Link to='/' className='notFound-empty__link'>
                            Let's go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
