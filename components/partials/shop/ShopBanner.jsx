import React, { Component } from 'react';
import Slider from 'react-slick';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';

class ShopBanner extends Component {
    render() {
        const carouselSetting = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 1000,
            dotsClass : "slick-dots custom-dots",
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        return (
            <div className="ps-shop-banner custom-reduce-top">
                <Slider {...carouselSetting} className="ps-carousel " >
                    {/* <img src="/static/img/slider/shop-default/3.jpg" alt="martfury" /> */}
                    <img src="/static/img/slider/shop-default/slide-4.jpg" alt="martfury" />
                    <img src="/static/img/slider/shop-default/1.jpg" alt="martfury" />
                    <img src="/static/img/slider/shop-default/2.jpg" alt="martfury" />
                </Slider>
                {/* <img src="/static/img/banner_badge.png" className="banner_badge"></img>
                <button type="button" className="btn btn-danger collection_btn">Go to collection</button>
                
                <div className="banner_text_1">GRONE BAULINE</div>
                <div className="banner_text_2">Some Text here</div> */}
            </div>
        );
    }
}

export default ShopBanner;
