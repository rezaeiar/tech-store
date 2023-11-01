import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainSlider from '../../Components/MainSlider/MainSlider'
import ProductsSection from '../../Components/ProductsSection/ProductsSection'
import OfferBanner from '../../Components/OfferBanner/OfferBanner'
import Brands from '../../Components/Brands/Brands'
import News from '../../Components/News/News'
import Quotation from '../../Components/Quotation/Quotation'
import Services from '../../Components/Services/Services'

import './Home.css'

function Home() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    const [allProducts, setAllProducts] = useState([])

    const [MSILaptopSeries, setMSILaptopSeries] = useState(['MSI GS Series', 'MSI GT Series', 'MSI GL Series'])
    const [selectedMSILaptopSerie, setSelectedMSILaptopSerie] = useState('MSI GS Series')
    const [MSILaptopSerieProducts, setMSILaptopSerieProducts] = useState([])

    const [MSIDesktopSeries, setMSIDesktopSeries] = useState(['MSI Infinute Series', 'MSI GL Series'])
    const [selectedMSIDesktopSerie, setSelectedMSIDesktopSerie] = useState('MSI Infinute Series')
    const [MSIDesktopSerieProducts, setMSIDesktopSerieProducts] = useState([])

    useEffect(() => {

        fetch('https://tech-store-db.vercel.app/products')
            .then(res => res.json())
            .then(products => {
                setAllProducts(products)
            })
    }, [])

    const changeSelectedMSILaptopSerieHandler = (e) => {

        setSelectedMSILaptopSerie(e.target.innerText)
    }
    const changeSelectedMSIDesktopSerieHandler = (e) => {

        setSelectedMSIDesktopSerie(e.target.innerText)
    }
    return (
        <div className='home'>
            <MainSlider />

            {/* Filter the latest store products */}
            <ProductsSection fullwidth uniqueID='s1' products={allProducts.slice().reverse().slice(0, 10)}>
                <h2 className="products-section__title">
                    new products
                </h2>
                <Link to='/catalog/allTypes/allBrands/allSeries/allPrices/allColors' className='products-section__link'>
                    See All New Products
                </Link>
            </ProductsSection>

            {/* Filtering a specific brand */}
            <ProductsSection bannerTitle='Custome Builds' bannerImg='/images/image\ 30.png' bannerLink='/catalog/desktop/Custome Builds/allSeries/allPrices/allColors' uniqueID='s2' products={allProducts.filter(prosuct => prosuct.categoryInfos.brand === "Custome Builds")}>
                <OfferBanner />
            </ProductsSection>

            {
                /* Filtering a specific brand */
                useMemo(() => {
                    setMSILaptopSerieProducts(allProducts.filter(product => product.categoryInfos.serie === selectedMSILaptopSerie && product.categoryInfos.type === "laptop"))
                }, [allProducts, selectedMSILaptopSerie])
            }
            <ProductsSection bannerTitle='MSI Laptops' bannerImg='/images/banner3.png' bannerLink='/catalog/laptop/MSI/allSeries/allPrices/allColors' uniqueID='s3' products={MSILaptopSerieProducts}>
                <ul className="products-section-list">
                    {
                        MSILaptopSeries.map(MSISerie => (
                            <li key={MSISerie} className={`products-section-list__item ${MSISerie === selectedMSILaptopSerie ? 'active' : ''}`} onClick={(e) => changeSelectedMSILaptopSerieHandler(e)}>
                                {MSISerie}
                            </li>
                        ))
                    }
                </ul>
            </ProductsSection>

            {
                /* Filtering a specific brand */
                useMemo(() => {
                    setMSIDesktopSerieProducts(allProducts.filter(product => product.categoryInfos.serie === selectedMSIDesktopSerie && product.categoryInfos.type === "desktop"))
                }, [allProducts, selectedMSIDesktopSerie])
            }
            <ProductsSection bannerTitle='Desktops' bannerImg='/images/banner4.png' bannerLink='/catalog/desktop/MSI/allSeries/allPrices/allColors' uniqueID='s4' products={MSIDesktopSerieProducts}>
                <ul className="products-section-list">
                    {
                        MSIDesktopSeries.map(MSISerie => (
                            <li key={MSISerie} className={`products-section-list__item ${MSISerie === selectedMSIDesktopSerie ? 'active' : ''}`} onClick={(e) => changeSelectedMSIDesktopSerieHandler(e)}>
                                {MSISerie}
                            </li>
                        ))
                    }
                </ul>
            </ProductsSection>

            {/* Filtering a specific brand */}
            <ProductsSection bannerTitle='Gaming Monitors' bannerImg='/images/banner5.png' bannerLink='/catalog/Gaming Monitor/allBrands/allSeries/allPrices/allColors' uniqueID='s5' products={allProducts.filter(product => product.categoryInfos.type === "Gaming Monitor")}></ProductsSection>
            <div className="container">
                <Brands />
            </div>
            <News />
            <Quotation />
            <Services />
        </div>
    )
}
export default Home;