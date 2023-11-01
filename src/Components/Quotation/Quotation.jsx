import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'

import './Quotation.css'

export default function Quotation() {

    const [allQuotations, setAllQuotations] = useState([])
    const [currentQuotationsIndex, setCurrentQuotationsIndex] = useState(0)
    const [paginateNumbers, setPaginateNumbers] = useState([])

    useEffect(() => {
        fetch('https://tech-store-db.vercel.app/quotations')
            .then(res => res.json())
            .then(result => {
                setAllQuotations(result)
                setPaginateNumbers(Array.from(Array(3).keys()))
            })
    }, [])
    return (
        <div className='quotation'>
            <div className="container">
                <div className="quotation__wrapper">
                    <div className="quotation__section quotation__section_header">
                        <span className="quotation__symbol">
                            ‘’
                        </span>
                        <p className="quotation__text">
                            {allQuotations[currentQuotationsIndex] && allQuotations[currentQuotationsIndex].content}
                        </p>
                    </div>
                    <div className="quotation__section quotation__section_middle">
                        <p className="quotation__quoter">
                            - {allQuotations[currentQuotationsIndex] && allQuotations[currentQuotationsIndex].quoter}
                        </p>
                    </div>
                    <div className="quotation__section quotation__section_footer">
                        <Button type='outlined-blue' value='leave us a review' to='/' />
                        <div className="quotation-pagination">
                            {
                                paginateNumbers.map(paginateNumber => (
                                    <div key={paginateNumber} className={`quotation-pagination__item ${paginateNumber === currentQuotationsIndex ? "active" : "" }`} onClick={() => setCurrentQuotationsIndex(paginateNumber)}></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
