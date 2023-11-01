import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './News.css'

function News() {

    const [allNews, setAllNews] = useState([])

    useEffect(() => {
        fetch('https://tech-store-db.vercel.app/news?_page=first&_limit=10')
            .then(res => res.json())
            .then(result => {
                setAllNews(result)
            })
    }, [])
    return (
        <div className='news'>
            <div className="container">
                <div className="news__wrapper">
                    <h3 className="news__title">
                        Follow us on Instagram for News, Offers & More
                    </h3>
                    <div className="news-box">
                        {
                            allNews.map(news => (
                                <div key={news.id} className="news-box__item">
                                    <a href={news.link} className='news-box__link'>
                                        <div className="news-box__img">
                                            <img src={`/images/news/${news.image}`} alt="News Picture" className='news-box__src' />
                                        </div>
                                        <div className="news-box__content">
                                            <p className="news-box__text">
                                                {news.content}
                                            </p>
                                            <span className="news-box__date">
                                                {news.date}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default News;
