import React, { Component } from 'react';

import Link from 'next/link';
import { getLanguage, translate } from 'react-switch-lang';
import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import en from '../../../public/static/data/locale/en.json';
import de from '../../../public/static/data/locale/de.json';
import fr from '../../../public/static/data/locale/fr.json';

import Menu from '../../elements/menu/Menu';
import CurrencyDropdown from './modules/CurrencyDropdown';
import LanguageSwicher from './modules/LanguageSwicher';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';
import { stickyHeader } from '../../../utilities/common-helpers';

class HeaderMarketPlace extends Component {
    constructor({ props }) {
        super(props);
    }
    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    render() {
        const lang = getLanguage();

        let product_categories_data;
        let menuPrimary_data;
        switch(lang){
            case "en":
                product_categories_data = en.menu.toggle_menu.submenu.product_categories;
                menuPrimary_data = en.menu.toggle_menu.submenu.menuPrimary.menu_1;
                break;
            case "de":
                product_categories_data = de.menu.toggle_menu.submenu.product_categories;
                menuPrimary_data = de.menu.toggle_menu.submenu.menuPrimary.menu_1;
                break;
            case "fr":
                product_categories_data = fr.menu.toggle_menu.submenu.product_categories;
                menuPrimary_data = fr.menu.toggle_menu.submenu.menuPrimary.menu_1;
                break;
            }


        return (
            <header
                className="header header--standard header--market-place-1 "
                id="headerSticky">
                <div className="header__top custom-market">
                    <div className="container">
                        <div className="header__left">
                            <p>Welcome to Martfury Online Shopping Store !</p>
                        </div>
                        <div className="header__right">
                            <ul className="header__top-links">
                                <li>
                                    <Link href="/vendor/store-list">
                                        <a>Store Location</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/page/blank">
                                        <a>Track Your Order</a>
                                    </Link>
                                </li>
                                <li>
                                    <CurrencyDropdown />
                                </li>
                                {/* <li>
                                    <LanguageSwicher />
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header__content">
                    <div className="container">
                        <div className="header__content-left">
                            <Link href="/home/market-place">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo.png"
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
                                    <Menu
                                        data={product_categories_data.data}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="header__content-center">
                            <SearchHeader />
                        </div>
                        <div className="header__content-right">
                            <ElectronicHeaderActions />
                        </div>
                    </div>
                </div>
                <nav className="navigation">
                    <div className="container">
                        <div className="navigation__left">
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        data={menuData.product_categories}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="navigation__right">
                            <Menu
                                data={menuPrimary_data}
                                className="menu"
                            />
                            <div className="ps-block--header-hotline inline">
                                <p>
                                    <i className="icon-telephone"></i>Hotline:
                                    <strong> 1-800-234-5678</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default translate(HeaderMarketPlace);
