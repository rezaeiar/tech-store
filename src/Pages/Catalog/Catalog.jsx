import React, { useEffect } from 'react'
import Banner from '../../Components/Banner/Banner';
import CatalogTitle from '../../Components/CatalogTitle/CatalogTitle';
import Bandcamp from '../../Components/Bandcamp/Bandcamp';
import CatalogSection from '../../Components/CatalogSection/CatalogSection';
import Services from '../../Components/Services/Services'
import { useParams } from 'react-router-dom';
import ProductsProvider from '../../context/ProductsContext';

import './Catalog.css'

function Catalog() {
    const parameters = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    return (
        <ProductsProvider>
            <div className='catalog'>
                <Banner />
                {
                    <Bandcamp {...parameters} />
                }
                {
                    <CatalogTitle {...parameters} />
                }
                <CatalogSection />
                <Services bgColor />
            </div>
        </ProductsProvider>
    )
}
export default Catalog;