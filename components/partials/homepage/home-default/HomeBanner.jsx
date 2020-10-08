import React, { Component } from 'react';

import Slider from 'react-slick';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import Link from 'next/link';

class HomeBanner extends Component {
    render() {
        const carouselSetting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            dotsClass : "slick-dots custom-dots",
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        return (
            <div className="ps-home-banner ps-home-banner--1 custom-reduce-top">
                <div className="ps-container">
                    <div className="ps-section__left">
                        <Slider {...carouselSetting} className="ps-carousel">
                            <div className="ps-banner">
                                <Link href="">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-1/slide-4.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                                

                            </div>
                            <div className="ps-banner">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-1/slide-2.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="ps-banner">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-1/slide-3.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="ps-banner">
                                <Link href="">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-1/slide-1.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </Slider>
                    </div>
                    <img src="/static/img/banner_badge.png" className="banner_badge"></img>
                    <div className="ps-banner collection_btn">
                        <Link href="">
                            <a>
                                Go to collection
                            </a>
                        </Link>
                    </div>
                    <div className="ps-banner shop_btn">
                        <Link href="/shop">
                            <a>
                                Go to Shop
                            </a>
                        </Link>
                    </div>
                    <div className="banner_text_1">GRONE BAULINE</div>
                    <div className="banner_text_2">Some Text here</div>
                    {/* <div className="ps-section__right">
                        <Link href="/shop">
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-1.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                        <Link href="/shop">
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-2.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default HomeBanner;
