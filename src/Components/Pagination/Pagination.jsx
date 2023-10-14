import React, { useEffect } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import './Pagination.css'

function Pagination({ pageCount, currentPage, onPage }) {

    const chanePageHandler = (page) => {

        onPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const chanePrevPage = (page) => {

        if (page >= 0) {

            onPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }
    const chaneNextPage = (page) => {

        if (page < pageCount) {

            onPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })

        }
    }
    return (
        <div className="catalog-pagination">
            <div className="catalog-pagination__item" onClick={() => chanePrevPage(currentPage - 1)}>
                <BiChevronLeft />
            </div>
            {
                currentPage > 1 &&
                <div className="catalog-pagination__item" onClick={() => chanePageHandler(0)}>
                    1
                </div>
            }
            {
                currentPage > 2 &&
                <span className="catalog-pagination__point">
                    ...
                </span>
            }
            {
                currentPage >= 1 &&
                <div className="catalog-pagination__item" onClick={() => chanePageHandler(currentPage - 1)}>
                    {currentPage}
                </div>
            }
            <div className="catalog-pagination__item current">
                {currentPage + 1}
            </div>
            {
                pageCount - currentPage > 2 &&
                <div className="catalog-pagination__item" onClick={() => chanePageHandler(currentPage + 1)}>
                    {currentPage + 2}
                </div>
            }
            {
                pageCount - currentPage > 3 &&
                <span className="catalog-pagination__point">
                    ...
                </span>
            }
            {
                pageCount - currentPage > 1 &&
                <div className="catalog-pagination__item" onClick={() => chanePageHandler(pageCount - 1)}>
                    {pageCount}
                </div>
            }

            <div className="catalog-pagination__item" onClick={() => chaneNextPage(currentPage + 1)}>
                <BiChevronRight />
            </div>
        </div>
    )
}
export default Pagination;