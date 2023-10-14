import React, { useState, useEffect, useContext } from 'react'
import Button from '../../Button/Button'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { ProductsContext } from '../../../context/ProductsContext'
import { useNavigate } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import AuthContext from '../../../contexts/authContext'

import './CatalogFilters.css'

function CatalogFilters() {

    let navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const [filterCounter, setFilterCounter] = useState(0)
    const [btn1Props] = useState({
        type: 'outlined-gray',
        value: 'clear filter',
        customStyles: {
            width: "100%"
        }
    });
    const [btn2Props] = useState({
        type: 'filled-blue',
        customStyles: {
            width: "100%"
        }
    });

    const allProducts = useContext(ProductsContext);

    const [getBrand, setGetBrand] = useState([]);
    const [getPrice, setGetPrice] = useState([
        { from: 0, to: 199 },
        { from: 200, to: 399 },
        { from: 400, to: 599 },
        { from: 600, to: 799 },
        { from: 800, to: 999 }
    ])
    const [getColor, setGetColor] = useState([]);
    const [getType, setGetType] = useState([]);

    const [filterTypeDisplay, setFilterTypeDisplay] = useState(true)
    const [filterPriceDisplay, setFilterPriceDisplay] = useState(true)
    const [filterColorDisplay, setFilterColorDisplay] = useState(true)
    const [filterBrandDisplay, setFilterBrandDisplay] = useState(false)

    const [selectedTypeFilter, setSelectedTypeFilter] = useState([])
    const [selectedPriceFilter, setSelectedPriceFilter] = useState([])
    const [selectedColorFilter, setSelectedColorFilter] = useState([])
    const [selectedBrandFilter, setSelectedBrandFilter] = useState([])

    const changeTypeSelection = (type) => {

        if (selectedTypeFilter.includes(type)) {

            setSelectedTypeFilter(prevValue => prevValue.filter(item => item != type))
            setFilterCounter(prevCount => prevCount - 1)
        } else {

            setSelectedTypeFilter(prevValue => [...prevValue, type])
            setFilterCounter(prevCount => prevCount + 1)
        }
    }
    const changePriceSelection = (price) => {

        if (selectedPriceFilter.some(item => item.from === price.from)) {

            setSelectedPriceFilter(prevValue => prevValue.filter(item => item.from != price.from))
            setFilterCounter(prevCount => prevCount - 1)
        } else {

            setSelectedPriceFilter(prevValue => [...prevValue, price])
            setFilterCounter(prevCount => prevCount + 1)
        }
    }
    const changeColorSelection = (color) => {

        if (selectedColorFilter.includes(color)) {

            setSelectedColorFilter(prevValue => prevValue.filter(item => item != color))
            setFilterCounter(prevCount => prevCount - 1)
        } else {

            setSelectedColorFilter(prevValue => [...prevValue, color])
            setFilterCounter(prevCount => prevCount + 1)
        }
    }
    const changeBrandSelection = (brand) => {

        if (selectedBrandFilter.includes(brand)) {

            setSelectedBrandFilter(prevValue => prevValue.filter(item => item != brand))
            setFilterCounter(prevCount => prevCount - 1)
        } else {

            setSelectedBrandFilter(prevValue => [...prevValue, brand])
            setFilterCounter(prevCount => prevCount + 1)
        }
    }

    useEffect(() => {
        let allBrand = []
        allProducts
            ? allProducts.forEach((product => {
                if (!allBrand.includes(product.categoryInfos.brand)) {
                    allBrand.push(product.categoryInfos.brand)
                }
            }))
            : []
        setGetBrand(allBrand)
        let allColor = []
        allProducts
            ? allProducts.forEach((product => {
                product.colors.forEach(color => {
                    if (!allColor.includes(color)) {
                        allColor.push(color)
                    }
                })
            }))
            : []
        setGetColor(allColor)
        let allType = []
        allProducts
            ? allProducts.forEach((product => {
                if (!allType.includes(product.categoryInfos.type)) {
                    allType.push(product.categoryInfos.type)
                }
            }))
            : []
        setGetType(allType)

    }, [allProducts])

    const applyFilters = () => {

        navigate(`/catalog/${selectedTypeFilter.length ? selectedTypeFilter.join("+") : 'allTypes'}/${selectedBrandFilter.length ? selectedBrandFilter.join("+") : 'allBrands'}/allSeries/${selectedPriceFilter.length ? selectedPriceFilter.map(price => price.from + "to" + price.to).join("+") : 'allPrices'}/${selectedColorFilter.length ? selectedColorFilter.join("+") : "allColors"}`)
        clearFilters()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const clearFilters = () => {
        setSelectedTypeFilter([])
        setSelectedPriceFilter([])
        setSelectedColorFilter([])
        setSelectedBrandFilter([])
        setFilterCounter(0)
    }
    const applyFilterHandler = () => {
        authContext.setIsShowFilterList(false)
    }
    return (
        <div className={`catalog-filters ${authContext.isShowFilterList ? 'sm-full' : ''}`}>
            <div className="catalog-filters__head_sm">
                <h4 className="catalog-filters__title_sm">
                    Filters
                </h4>
                <IoMdClose onClick={() => authContext.setIsShowFilterList(false)} className='catalog-filters__close' />
            </div>
            <div className="catalog-filters__head">
                <h4 className="catalog-filters__title">
                    Filters
                </h4>
                <Button {...btn1Props} onAction={clearFilters} />
            </div>
            <div className="catalog-filters-category">
                <div className="catalog-filters-category__title" onClick={() => setFilterTypeDisplay(prevState => !prevState)}>
                    Devices
                    {
                        filterTypeDisplay
                            ? <BiChevronUp />
                            : <BiChevronDown />
                    }
                </div>
                {
                    filterTypeDisplay &&
                    <ul className="catalog-filters-category__list">
                        {
                            getType.map(type => (
                                <li key={type} className={`catalog-filters-category__item ${selectedTypeFilter.includes(type) ? "selected" : ''}`} onClick={() => changeTypeSelection(type)}>
                                    {type}
                                    <span className="catalog-filters-category__count">
                                        {
                                            allProducts
                                            && allProducts.filter(product => product.categoryInfos.type === type).length
                                        }
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <div className="catalog-filters-category">
                <div className="catalog-filters-category__title" onClick={() => setFilterPriceDisplay(prevState => !prevState)}>
                    Price
                    {
                        filterPriceDisplay
                            ? <BiChevronUp />
                            : <BiChevronDown />
                    }
                </div>
                {
                    filterPriceDisplay &&
                    <ul className="catalog-filters-category__list">
                        {
                            getPrice.map(price => (
                                <li key={price.from} className={`catalog-filters-category__item ${selectedPriceFilter.some(item => item.from === price.from) ? "selected" : ""}`} onClick={() => changePriceSelection(price)}>
                                    ${price.from.toFixed(2)} - ${price.to.toFixed(2)}
                                    <span className="catalog-filters-category__count">
                                        {
                                            allProducts
                                            && allProducts.filter(product => product.price >= price.from && product.price <= price.to).length
                                        }
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <div className="catalog-filters-category">
                <div className="catalog-filters-category__title" onClick={() => setFilterColorDisplay(prevState => !prevState)}>
                    Color
                    {
                        filterColorDisplay
                            ? <BiChevronUp />
                            : <BiChevronDown />
                    }
                </div>
                {
                    filterColorDisplay &&
                    <ul className="catalog-filters-category__list row">
                        {
                            getColor.map(color => (
                                <li key={color} className={`catalog-filters-category__border ${selectedColorFilter.includes(color) ? "selected" : ""}`} onClick={() => changeColorSelection(color)}>
                                    <div className="catalog-filters-category__color" style={{ backgroundColor: color }}></div>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <div className="catalog-filters-category">
                <div className="catalog-filters-category__title" onClick={() => setFilterBrandDisplay(prevState => !prevState)}>
                    Brands
                    {
                        filterBrandDisplay
                            ? <BiChevronUp />
                            : <BiChevronDown />
                    }
                </div>
                {
                    filterBrandDisplay &&
                    <ul className="catalog-filters-category__list">
                        {
                            getBrand.map(brand => (
                                <li key={brand} className={`catalog-filters-category__item ${selectedBrandFilter.includes(brand) ? "selected" : ''}`} onClick={() => changeBrandSelection(brand)}>
                                    {brand}
                                    <span className="catalog-filters-category__count">
                                        {
                                            allProducts
                                            && allProducts.filter(product => product.categoryInfos.brand === brand).length
                                        }
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <div className="catalog-filters__apply" onClick={applyFilters}>
                <Button {...btn2Props} value={`apply filters (${filterCounter})`} onAction={applyFilterHandler} />
            </div>
        </div>
    )
}
export default CatalogFilters;