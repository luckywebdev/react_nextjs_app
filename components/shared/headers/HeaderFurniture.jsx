import React, { Component } from 'react';

import Link from 'next/link';
import { getLanguage, translate } from 'react-switch-lang';
import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import en from '../../../public/static/data/locale/en.json';
import de from '../../../public/static/data/locale/de.json';
import fr from '../../../public/static/data/locale/fr.json';

import Menu from '../../elements/menu/Menu';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';
import CurrencyDropdown from './modules/CurrencyDropdown';
import LanguageSwicher from './modules/LanguageSwicher';
import { stickyHeader } from '../../../utilities/common-helpers';

class HeaderFurniture extends Component {
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
            <header className="header header--furniture custom-reduce-top" id="headerSticky">
                <div className="header__top">
                    <div className="container">
                        <div className="header__left">
                            <Link href="/home/furniture">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo-furniture.png"
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
                                        data={product_categories_data}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <ElectronicHeaderActions />
                        </div>
                    </div>
                </div>
                <nav className="navigation">
                    <div className="container">
                        <div className="navigation__left">
                            <Menu
                                data={menuPrimary_data}
                                className="menu menu--furniture"
                            />
                        </div>
                        <div className="navigation__right">
                            <ul className="navigation__extra">
                                <li>
                                    <Link href="/page/blank">
                                        <a>Sell on Martfury</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/page/blank">
                                        <a>Tract your order</a>
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
                </nav>
            </header>
        );
    }
}

export default HeaderFurniture;
