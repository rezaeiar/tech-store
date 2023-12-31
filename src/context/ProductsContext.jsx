import { createContext, useState, useEffect } from "react";
export const ProductsContext = createContext()

export default function ProductsProvider({ children }) {

    const [allProducts, setAllProducts] = useState()

    useEffect(() => {
        fetch('https://tech-store-db.vercel.app/products')
            .then(res => res.json())
            .then(products => {
                setAllProducts(products)
            })
    }, [])
    return (
        <ProductsContext.Provider value={allProducts}>
            {children}
        </ProductsContext.Provider>
    )
}
