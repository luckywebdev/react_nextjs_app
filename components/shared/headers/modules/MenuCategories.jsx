import React from 'react';
import menuData from '../../../../public/static/data/menu';
import Menu from '../../../elements/menu/Menu';
import en from '../../../../public/static/data/locale/en.json';
import de from '../../../../public/static/data/locale/de.json';
import fr from '../../../../public/static/data/locale/fr.json';
import { getLanguage, translate } from 'react-switch-lang';

const MenuCategories = (props) => {
    const lang = getLanguage();

    let product_categories_data;
    switch(lang){
        case "en":
            product_categories_data = en.menu.toggle_menu.submenu.product_categories;
            break;
        case "de":
            product_categories_data = de.menu.toggle_menu.submenu.product_categories;
            break;
        case "fr":
            product_categories_data = fr.menu.toggle_menu.submenu.product_categories;
            break;
        }
    return (
        <Menu data={product_categories_data} className="menu--dropdown" />
    );
} 

export default translate(MenuCategories);
