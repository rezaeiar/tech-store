import React from 'react'
import Card from '../Card/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'

import './ProductsSlider.css'

function ProductsSlider({ fullwidth, uniqueID, products }) {
    return (
        <Swiper
            spaceBetween={15}
            slidesPerView='auto'
            navigation={{
                prevEl: `.products-slider__prev_${uniqueID}`,
                nextEl: `.products-slider__next_${uniqueID}`
            }}
            modules={[Autoplay, Navigation]}
            className='products-slider'
            style={fullwidth ? { width: '100%' } : { width: 'calc(100% - 223px)' }}
        >
            {
                products.map(product => (
                    <SwiperSlide className='products-slider__slide' key={product.id}>
                        <Card {...product} />
                    </SwiperSlide>
                ))
            }
            {
                fullwidth &&
                <>
                    <div className={`products-slider__btn products-slider__prev products-slider__prev_${uniqueID}`}>
                        <BiChevronLeft />
                    </div>
                    <div className={`products-slider__btn products-slider__next products-slider__next_${uniqueID}`}>
                        <BiChevronRight />
                    </div>
                </>
            }
        </Swiper>
    )
}
export default ProductsSlider