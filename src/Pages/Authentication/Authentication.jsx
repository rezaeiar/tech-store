import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Services from '../../Components/Services/Services'
import { useParams } from 'react-router-dom'

import './Authentication.css'

function Authentication() {
    const parameteres = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [parameteres])
    return (
        <div className="authentication">
            <div className="container">
                <Outlet />
            </div>
            <Services bgColor />
        </div>
    )
}

export default Authentication
