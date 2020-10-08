import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router'

import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { stickyHeader } from '../../../utilities/common-helpers';
import { getLanguage, translate } from 'react-switch-lang';

import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';
// import { route } from 'next/dist/next-server/server/router';


class HeaderDefault extends Component {
    constructor({ props }) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }
    // isActiveLink(href) {
    //     if (Router.router.pathname === href) {
    //         return 'acitve';
    //     }
    //     return '';
    // }
    render() {
        const { t } = this.props;
        const lang = getLanguage();
        return (
            <header
                className="header header--1"
                data-sticky="true"
                id="headerSticky">
                <div className="header__top custom-top ">
                    <div className="ps-container ">
                        <div className="header__left">
                            <div className="header__logo">
                                <Link href="/" >
                                    <a className={`ps-logo`}>
                                    {/* ${this.isActiveLink('/')} */}
                                        <img
                                            src="/static/img/logo_light.png"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories />
                                </div>
                            </div>
                        </div>
                        <div className="header__center max-width">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <ul className="navigation__extra custom">
                                <li>
                                    <Link href="/vendor/become-a-vendor" >
                                        <a style={{color:"white"}} >{ t("menu.sub_menu_r.item_1") }</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/order-tracking">
                                        <a  style={{color:"white"}}>{ t("menu.sub_menu_r.item_2") }</a>
                                    </Link>
                                </li>
                                <li>
                                    <CurrencyDropdown />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <NavigationDefault />
            </header>
        );
    }
}

export default translate(HeaderDefault);
