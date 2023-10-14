import React, { useState, useContext } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button/Button'
import AuthContext from '../../contexts/authContext'

import './SearchBox.css'

function SearchBox({ show, items }) {

    const authContext = useContext(AuthContext)
    const [btn1Props] = useState({
        value: 'show details',
        type: 'outlined-blue',
        customStyles: {
            width: "100%",
        }
    });
    const closeSearch = () => {
        authContext.setIsShowSearch(false)
        authContext.setSearchItems([])
    }
    return (
        <div className={`searchBox ${show ? "show" : ''}`}>
            <div className="searchBox__content">
                <div className="searchBox__head">
                    <h4 className="searchBox__title">
                        Display the result ({items.length} item founded)
                    </h4>
                    <IoMdClose className='searchBox__icon' onClick={() => closeSearch()} />
                </div>
                {
                    items.length ? (
                        <div className="searchBox__container">
                            {
                                items.map(item => (
                                    <div className="searchBox__item" onClick={() => closeSearch()} key={item.id}>
                                        <div className="searchBox__img">
                                            <img src={`/images/products/${item.images[0]}`} alt="Product picture" className="searchBox__src" />
                                        </div>
                                        <div className="searchBox__details">
                                            <div className="serachBox__top">
                                                <h1 className="searchBox__productTitle">
                                                    {item.title}
                                                </h1>
                                                <p className="searchBox__desc">
                                                    {item.description.slice(0, 100)}...
                                                </p>
                                            </div>
                                            <Button {...btn1Props} to={`/product/${item.id}`} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="searchBox__notfound">
                            No product with this specification was found.
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default SearchBox
