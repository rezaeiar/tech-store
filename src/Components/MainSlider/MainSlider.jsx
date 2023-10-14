import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import 'swiper/css'
import './MainSlider.css'

function MainSlider() {

    const [sliderSlides, setSliderSlides] = useState([])

    useEffect(() => {

        fetch('http://localhost:3000/sliderSlides')
            .then(res => res.json())
            .then(slides => {
                setSliderSlides(slides)
            })
    }, [])
    return (
        <div className='main-slider'>
            <div className="container">
                <Swiper
                    autoplay={{
                        delay: 3000,
                        dissableOnIntraction: true
                    }}
                    navigation={{
                        prevEl: `.main-slider__prev`,
                        nextEl: `.main-slider__next`
                    }}
                    loop={true}
                    modules={[Autoplay, Navigation]}
                    className='main-slider__swiper'
                >
                    {
                        sliderSlides.map(sliderSlide => (
                            <SwiperSlide key={sliderSlide.id} className='main-slider__slide'>
                                <Link className='main-slider__link' to={sliderSlide.link}>
                                    <img src={`/images/home/${sliderSlide.image}`} alt="Banner picture" className='main-slider__img' />
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                    <div className="main-slider__btn main-slider__prev">
                        <BiChevronLeft />
                    </div>
                    <div className="main-slider__btn main-slider__next">
                        <BiChevronRight />
                    </div>
                </Swiper>
            </div>
        </div>
    )
}
export default MainSlider;