import React from 'react'
import Service from './Service/Service'

import './Services.css'

export default function Services({ bgColor }) {
    return (
        <div className={bgColor ? 'services bg-color': 'services'}>
            <div className="container">
                <div className="services__wrapper">
                    <Service icon='bx_bx-support.svg' title='Product Support' info='Up to 3 years on-site warranty available for your peace of mind.' />
                    <Service icon='ri_account-pin-circle-fill.svg' title='Personal Account' info='With big discounts, free delivery and a dedicated support specialist.' />
                    <Service icon='entypo_price-tag.svg' title='Amazing Savings' info='Up to 70% off new Products, you can be sure of the best price.' />
                </div>
            </div>
        </div>
    )
}
