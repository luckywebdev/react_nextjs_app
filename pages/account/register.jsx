import React from 'react';
import { translate } from 'react-switch-lang';
import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Register from '../../components/partials/account/Register';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const RegisterPage = (props) => {
    const {t} = props;
    const breadCrumb = [
        {
            text: t('home.title'),
            url: '/',
        },
        {
            text: t('login.register_alert'),
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Register />
            </div>
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};

export default translate(RegisterPage);
