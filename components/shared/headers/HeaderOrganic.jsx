import React, { Component } from 'react';
import { getLanguage, translate } from 'react-switch-lang';

import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import en from '../../../public/static/data/locale/en.json';
import de from '../../../public/static/data/locale/de.json';
import fr from '../../../public/static/data/locale/fr.json';

import Menu from '../../elements/menu/Menu';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';
import Link from 'next/link';

class HeaderOrganic extends Component {
    constructor({ props }) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

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
            <header className="header header--organic custom-reduce-top" id="headerSticky">
                <div className="header__top">
                    <div className="container">
                        <div className="header__left">
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
                            <Link href="/home/organic">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo-organic.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>
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
                        <div className="navigation__right">
                            <Menu
                                data={menuPrimary_data}
                                className="menu menu--organic"
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

export default HeaderOrganic;
