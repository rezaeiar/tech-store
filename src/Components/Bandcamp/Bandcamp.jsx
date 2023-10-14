import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

import './Bandcamp.css'

function Bandcamp({ type, brand, serie }) {

    return (
        <div className='bandcamp'>
            {
                type &&
                <div className="container">
                    <div className="bandcamp__wrapper">
                        <span className='bandcamp__item'>Home <BiChevronRight className='bandcamp__icon' /></span>

                        <span className='bandcamp__item'>
                            {
                                type === 'allTypes'
                                    ? 'All Devices'
                                    : type.split("+").join(" & ")
                            }
                            <BiChevronRight className='bandcamp__icon' />
                        </span>
                        <span className='bandcamp__item'>
                            {
                                brand === 'allBrands'
                                    ? 'All Brands'
                                    : brand.split("+").join(" & ")
                            }
                            <BiChevronRight className='bandcamp__icon' />
                        </span>
                        <span className='bandcamp__item last'>
                            {
                                serie === 'allSeries'
                                    ? 'All Series'
                                    : serie.split("+").join(" & ")
                            }
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}
export default Bandcamp;