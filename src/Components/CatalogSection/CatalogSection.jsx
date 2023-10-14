import React from 'react'
import CatalogSide from './CatalogSide/CatalogSide';
import CatalogContent from './CatalogContent/CatalogContent';

import './CatalogSection.css'

function CatalogSection() {
    return (
        <div className='catalog-section'>
            <div className="container">
                <div className="catalog-section__wrapper">
                    <CatalogSide />
                    <CatalogContent />
                </div>
            </div>
        </div>
    )
}

export default CatalogSection;