import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

import './CatalogTitle.css'

function CatalogTitle({ type, brand }) {

    const allProducts = useContext(ProductsContext);
    return (
        <div className='catalog-title'>
            <div className="container">
                <div className="catalog-title__wrapper">
                    <h1 className="catalog-title__value">
                        {
                            type === 'allTypes' && brand !== 'allBrands' && (
                                brand.split("+").join(" & ") + ` Series ${brand.split("+").length === 1 ? `(${allProducts && allProducts.filter(product => product.categoryInfos.brand.includes(brand.split("+"))).length})`: ''}`
                            )
                        }
                        {
                            type !== 'allTypes' && brand === 'allBrands' &&
                            type.split("+").map(item => item + "s ").join("& ") + (type.split("+").length === 1 ? `(${allProducts && allProducts.filter(product => product.categoryInfos.type.includes(type.split("+"))).length})` : '')
                        }
                        {
                            type !== 'allTypes' && brand !== 'allBrands' &&
                            brand.split("+").join(" & ") + ` Series ${brand.split("+").length === 1 ? `(${allProducts && allProducts.filter(product => product.categoryInfos.brand.includes(brand.split("+"))).length})`: ''}`
                        }
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default CatalogTitle;