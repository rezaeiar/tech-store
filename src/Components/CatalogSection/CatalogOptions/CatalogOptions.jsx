import React, { useState, useContext } from 'react'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ProductsContext } from '../../../context/ProductsContext';
import Dropdown from '../../Dropdown/Dropdown'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../contexts/authContext'

import './CatalogOptions.css'

function CatalogOptions({ type, brand, serie, price, color, setType, setBrand, setSerie, setPrice, setColor, listDisplay, onListDisplay, productsCount, display, currentPage, productsDisplay, setCurrentPage, currentShowParam, currentSortParam, setcurrentShowParam, setcurrentSortParam }) {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const parameters = useParams()
    const allProducts = useContext(ProductsContext);

    const deleteTypeFilter = (selectedType) => {
        let filteredType = parameters.type;
        filteredType = filteredType.split("+").filter(item => item != selectedType).join("+")

        navigate(`/catalog/${filteredType.length ? filteredType : "allTypes"}/${parameters.brand}/${parameters.serie}/${parameters.price}/${parameters.color}`)
    }
    const deleteBrandFilter = (selectedBrand) => {
        let filteredBrand = parameters.brand;
        filteredBrand = filteredBrand.split("+").filter(item => item != selectedBrand).join("+")

        navigate(`/catalog/${parameters.type}/${filteredBrand.length ? filteredBrand : "allBrands"}/${parameters.serie}/${parameters.price}/${parameters.color}`)
    }
    const deleteSerieFilter = (selectedSerie) => {
        let filteredSeries = parameters.serie;
        filteredSeries = filteredSeries.split("+").filter(item => item != selectedSerie).join("+")

        navigate(`/catalog/${parameters.type}/${parameters.brand}/${filteredSeries.length ? filteredSeries : "allSeries"}/${parameters.price}/${parameters.color}`)
    }
    const deletePriceFilter = (selectedPrice) => {
        let filteredPrice = parameters.price;
        filteredPrice = filteredPrice.split("+").filter(item => item != `${selectedPrice.from}to${selectedPrice.to}`).join("+")

        navigate(`/catalog/${parameters.type}/${parameters.brand}/${parameters.serie}/${filteredPrice.length ? filteredPrice : "allPrices"}/${parameters.color}`)
    }
    const deleteColorFilter = (selectedColor) => {
        let filteredColor = parameters.color;
        filteredColor = filteredColor.split("+").filter(item => item != selectedColor).join("+")

        navigate(`/catalog/${parameters.type}/${parameters.brand}/${parameters.serie}/${parameters.price}/${filteredColor.length ? filteredColor : "allColors"}`)
    }
    const clearAllFilters = () => {
        navigate('/catalog/allTypes/allBrands/allSeries/allPrices/allColors')
    }

    const changeProductsDisplay = (isList) => {

        onListDisplay(isList)
        setCurrentPage(0)
    }

    const [showDisplay, setShowDisplay] = useState(false)
    const [showParams] = useState(["All Products", "Available", "Discount"])

    const [sortDisplay, setSortDisplay] = useState(false)
    const [sortParams] = useState(["Possition", "Cheapest"])

    const sortDisplayHandler = () => {

        setSortDisplay(prevState => {
            return !prevState
        })
        setShowDisplay(false)
    }
    const showDisplayHandler = () => {
        setShowDisplay(prevState => {
            return !prevState
        })
        setSortDisplay(false)
    }
    return (
        <div className='catalog-options'>
            <div className="catalog-options__display">
                <span className="catalog-options__result">
                    Items {`${(display ? currentPage * 5 + 1 : currentPage * 19 + 1)}-${(display ? currentPage * 5 + productsDisplay : currentPage * 20 + productsDisplay) + 1}`} of {productsCount}
                </span>
                <div className="catalog-options-sort">
                    <div className="catalog-options-sort__box">
                        <button className="catalog-options-sort__btn" onClick={sortDisplayHandler}>
                            <span className="catalog-options-sort__title">Sort By:</span>{currentSortParam}
                            <BiChevronDown />
                            {
                                sortDisplay &&
                                <Dropdown items={sortParams} currentItem={currentSortParam} setCurrent={setcurrentSortParam} />
                            }
                        </button>
                        <button className="catalog-options-sort__btn filter" onClick={() => authContext.setIsShowFilterList(true)}>
                            Filter
                        </button>
                        <button className="catalog-options-sort__btn" onClick={showDisplayHandler}>
                            <span className="catalog-options-sort__title">Show:</span>{currentShowParam}
                            <BiChevronDown />
                            {
                                showDisplay &&
                                <Dropdown items={showParams} currentItem={currentShowParam} setCurrent={setcurrentShowParam} />
                            }
                        </button>
                    </div>
                    <button className={`catalog-options-sort__type ${!listDisplay ? 'active' : ''}`} onClick={() => changeProductsDisplay(false)}>
                        <BsGrid3X3GapFill className='catalog-options-sort__icon' />
                    </button>
                    <button className={`catalog-options-sort__type ${listDisplay ? 'active' : ''}`} onClick={() => changeProductsDisplay(true)}>
                        <FaListUl className='catalog-options-sort__icon' />
                    </button>
                </div>
            </div>
            {
                !!(type.length || brand.length || serie.length || price.length || color.length) &&
                <div className="filter-items">
                    <ul className="filter-items__list">
                        {
                            type.map(item => (
                                <li key={item} className="filter-items__item">
                                    {item}<span className="filter-items__count">({allProducts && allProducts.filter(product => product.categoryInfos.type === item).length})</span>
                                    <AiFillCloseCircle className='filter-items__icon' onClick={() => deleteTypeFilter(item)} />
                                </li>
                            ))
                        }
                        {
                            brand.map(item => (
                                <li key={item} className="filter-items__item">
                                    {item}<span className="filter-items__count">({allProducts && allProducts.filter(product => product.categoryInfos.brand === item).length})</span>
                                    <AiFillCloseCircle className='filter-items__icon' onClick={() => deleteBrandFilter(item)} />
                                </li>
                            ))
                        }
                        {
                            serie.map(item => (
                                <li key={item} className="filter-items__item">
                                    {item}<span className="filter-items__count">({allProducts && allProducts.filter(product => product.categoryInfos.serie === item).length})</span>
                                    <AiFillCloseCircle className='filter-items__icon' onClick={() => deleteSerieFilter(item)} />
                                </li>
                            ))
                        }
                        {
                            price.map(item => (
                                <li key={item.from} className="filter-items__item">
                                    $ {item.from} / {item.to}<span className="filter-items__count">({allProducts && allProducts.filter(product => product.price >= item.from && product.price <= item.to).length})</span>
                                    <AiFillCloseCircle className='filter-items__icon' onClick={() => deletePriceFilter(item)} />
                                </li>
                            ))
                        }
                        {
                            color.map(item => (
                                <li key={item} className="filter-items__item">
                                    {item} Devices<span className="filter-items__count">({allProducts && allProducts.filter(product => product.colors.includes(item)).length})</span>
                                    <AiFillCloseCircle className='filter-items__icon' onClick={() => deleteColorFilter(item)} />
                                </li>
                            ))
                        }
                        {
                            !!(type.length || brand.length || serie.length || price.length || color.length) &&
                            <li className="filter-items__item filter-items__clear" onClick={clearAllFilters}>
                                Clear All
                            </li>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}
export default CatalogOptions;

// show exist ya all offer
// sort price 