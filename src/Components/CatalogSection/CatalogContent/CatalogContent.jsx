import React, { useState, useEffect, useContext } from 'react'
import CatalogOptions from '../CatalogOptions/CatalogOptions';
import Card from '../../Card/Card'
import CatalogMore from '../CatalogMore/CatalogMore';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';
import Pagination from '../../Pagination/Pagination';

import './CatalogContent.css'

function CatalogContent() {
    const parameters = useParams();

    const [selectedTypeFilter, setSelectedTypeFilter] = useState([]);
    const [selectedBrandFilter, setSelectedBrandFilter] = useState([]);
    const [selectedSerieFilter, setSelectedSerieFilter] = useState([]);
    const [selectedPriceFilter, setSelectedPriceFilter] = useState([]);
    const [selectedColorFilter, setSelectedColorFilter] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isListDisplay, setIsListDisplay] = useState(false)
    const allProducts = useContext(ProductsContext);

    const [pageLen, setPageLen] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedProducts, setDisplayedProducts] = useState([])

    const [currentShowParam, setcurrentShowParam] = useState("All Products")
    const [currentSortParam, setcurrentSortParam] = useState("Possition")

    const [finalProductArray, setFinalProductArray] = useState([])
    useEffect(() => {

        parameters.type !== "allTypes"
            ? (
                setSelectedTypeFilter(parameters.type.split("+"))
            )
            : setSelectedTypeFilter([])
        parameters.brand !== "allBrands"
            ? (
                setSelectedBrandFilter(parameters.brand.split("+"))
            )
            : setSelectedBrandFilter([])
        parameters.serie !== "allSeries"
            ? (
                setSelectedSerieFilter(parameters.serie.split("+"))
            )
            : setSelectedSerieFilter([])
        parameters.price !== "allPrices"
            ? (
                setSelectedPriceFilter(parameters.price.split("+").map(price => {

                    let priceFrom = null;
                    let priceTo = null;

                    price.split("to").forEach((slicedPrice, index) => {
                        if (!index) {
                            priceFrom = slicedPrice
                        } else {
                            priceTo = slicedPrice
                        }
                    })
                    let priceObg = { from: priceFrom, to: priceTo }
                    return priceObg
                }))
            )
            : setSelectedPriceFilter([])
        parameters.color !== "allColors"
            ? (
                setSelectedColorFilter(parameters.color.split("+"))
            )
            : setSelectedColorFilter([])

        allProducts && (
            setFilteredProducts(allProducts)
        )
    }, [parameters, allProducts])

    useEffect(() => {
        setCurrentPage(0)

        let getTypeFilter = []
        filteredProducts.forEach(product => {

            if (selectedTypeFilter.length) {
                selectedTypeFilter.forEach(type => {

                    if (product.categoryInfos.type === type) {

                        getTypeFilter.push(product)
                    }
                })
            } else {

                getTypeFilter = allProducts
            }
        })

        let getBrandFilter = []
        getTypeFilter.forEach(product => {

            if (selectedBrandFilter.length) {
                selectedBrandFilter.forEach(brand => {

                    if (product.categoryInfos.brand === brand) {

                        getBrandFilter.push(product)
                    }
                })
            } else {

                getBrandFilter = getTypeFilter
            }
        })
        let getSerieFilter = []
        getBrandFilter.forEach(product => {

            if (selectedSerieFilter.length) {
                selectedSerieFilter.forEach(serie => {

                    if (product.categoryInfos.serie === serie) {

                        getSerieFilter.push(product)
                    }
                })
            } else {

                getSerieFilter = getBrandFilter
            }
        })
        let getColorFilter = []
        getSerieFilter.forEach(product => {

            if (selectedColorFilter.length) {
                selectedColorFilter.forEach(color => {

                    if (product.colors.includes(color)) {

                        getColorFilter.push(product)
                    }
                })
            } else {

                getColorFilter = getSerieFilter
            }
        })

        let jsonObject = getColorFilter.map(JSON.stringify);
        let uniqueSet = new Set(jsonObject);
        getColorFilter = Array.from(uniqueSet).map(JSON.parse);


        let getPriceFilter = []
        getColorFilter.forEach(product => {

            if (selectedPriceFilter.length) {
                selectedPriceFilter.forEach(price => {

                    if (product.price >= price.from && product.price <= price.to) {

                        getPriceFilter.push(product)
                    }
                })
            } else {

                getPriceFilter = getColorFilter
            }
        })

        let showProducts = []
        if (currentShowParam === "Available") {

            showProducts = getPriceFilter.filter(product => product.inventory)
        } else if (currentShowParam === "Discount") {

            showProducts = getPriceFilter.filter(product => product.discount)
        } else if ("All Products") {
            showProducts = getPriceFilter
        }
        if (currentSortParam === "Cheapest") {
            showProducts = showProducts.sort((item1, item2) => item1.price - item2.price)
        } else {
            showProducts = showProducts
        }

        setFinalProductArray(showProducts)
        // setFilteredProducts(showProducts)

    }, [selectedTypeFilter, selectedBrandFilter, selectedSerieFilter, selectedPriceFilter, selectedColorFilter, currentShowParam, currentSortParam])

    useEffect(() => {
        setPageLen(isListDisplay ? Math.ceil(finalProductArray.length / 5) : Math.ceil(finalProductArray.length / 20))

        let slicedProducts = []
        if (isListDisplay) {

            slicedProducts = finalProductArray.slice(currentPage * 5, (currentPage * 5) + 5)

        } else {

            slicedProducts = finalProductArray.slice(currentPage * 20, (currentPage * 20) + 20)
        }
        setDisplayedProducts(slicedProducts)
    }, [finalProductArray, isListDisplay, currentPage])

    const ChangeCurrentPage = (page) => {
        setCurrentPage(page)
    }
    return (
        <div className='catalog-content'>
            <CatalogOptions setCurrentPage={setCurrentPage} productsDisplay={displayedProducts.length - 1} productsCount={finalProductArray.length} display={isListDisplay} currentPage={currentPage} type={selectedTypeFilter} brand={selectedBrandFilter} serie={selectedSerieFilter} price={selectedPriceFilter} color={selectedColorFilter} setType={setSelectedTypeFilter} setBrand={setSelectedBrandFilter} setSerie={setSelectedSerieFilter} setPrice={setSelectedPriceFilter} setColor={setSelectedColorFilter} listDisplay={isListDisplay} onListDisplay={isList => setIsListDisplay(isList)} currentShowParam={currentShowParam} currentSortParam={currentSortParam} setcurrentShowParam={setcurrentShowParam} setcurrentSortParam={setcurrentSortParam} />
            <div className="catalog-content__box">
                {
                    displayedProducts.map(product => (
                        <Card key={product.id} {...product} staticCard list={isListDisplay ? true : false} />
                    ))
                }
            </div>
            {
                pageLen
                    ? <Pagination pageCount={pageLen} currentPage={currentPage} onPage={ChangeCurrentPage} />
                    : null
            }
            <CatalogMore />
        </div>
    )
}
export default CatalogContent;