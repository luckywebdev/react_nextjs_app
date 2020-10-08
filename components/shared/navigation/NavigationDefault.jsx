import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router'

import { notification } from 'antd';
import { getLanguage, translate } from 'react-switch-lang';
import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import en from '../../../public/static/data/locale/en.json';
import de from '../../../public/static/data/locale/de.json';
import fr from '../../../public/static/data/locale/fr.json';

import HeaderActions from '../headers/modules/HeaderActions';

import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';

class NavigationDefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPathName: null
        }
    }

    componentDidMount() {
       this.setState({
            currentPathName: Router.router.pathname
        });
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        const { t } = this.props;
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
            <nav className="navigation custom-top2">
                <div className="ps-container">
                    <div className="navigation__left">
                        <div className="menu--product-categories">
                            <div className={`menu__toggle custom`}>
                                <i className="icon-menu" ></i>
                                <span> { t("menu.toggle_menu.title") }</span>
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
                            className="menu"
                        />
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default translate(NavigationDefault);
