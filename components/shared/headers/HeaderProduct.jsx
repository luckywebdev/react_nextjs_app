import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLanguage, translate } from 'react-switch-lang';

import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { addItem } from '../../../store/cart/action';
import { stickyHeader } from '../../../utilities/common-helpers';

class HeaderProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { productData } = this.props;
        this.props.dispatch(addItem(productData));
    };

    handleScroll = () => {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (number >= 300) {
            document
                .getElementById('headerSticky')
                .classList.add('header--sticky');
        } else {
            document
                .getElementById('headerSticky')
                .classList.remove('header--sticky');
        }
    };

    render() {
        const { productData } = this.props;
        const { t } = this.props;
        
        return (
            <header
                className="header header--1 header--product"
                data-sticky="true"
                id="headerSticky">
                <div className="header__top ">
                    <div className="ps-container">
                        <div className="header__left">
                            <Link href="/">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo_light.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories t={ t } />
                                </div>
                            </div>
                        </div>
                        <div className="header__center header-fixed-heigth">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
                <nav className="navigation navigation--product">
                    <div className="container">
                        <article className="ps-product--header-sticky">
                            <div className="ps-product__thumbnail">
                                <img
                                    src="/static/img/products/detail/fullwidth/1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="ps-product__wrapper">
                                <div className="ps-product__content">
                                    <Link
                                        href="/product/[pid]"
                                        as={`/product/${productData.id}`}>
                                        <a className="ps-product__title">
                                            {productData.title}
                                        </a>
                                    </Link>
                                </div>
                                <div className="ps-product__shopping">
                                    {productData.sale === true ? (
                                        <span className="ps-product__price">
                                            <span>${productData.price}</span>
                                            <del>${productData.salePrice}</del>
                                        </span>
                                    ) : (
                                        <span className="ps-product__price">
                                            <span>${productData.price}</span>
                                        </span>
                                    )}
                                    <a
                                        className="ps-btn"
                                        href="#"
                                        onClick={e =>
                                            this.handleAddItemToCart(e)
                                        }>
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </nav>
            </header>
        );
    }
}
export default connect()(translate(HeaderProduct));
