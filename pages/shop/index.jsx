import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import Newletters from '../../components/partials/commons/Newletters';
import LayoutShop from '../../components/partials/shop/LayoutShop';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ShopBrands from '../../components/partials/shop/ShopBrands';
import ShopBanner from '../../components/partials/shop/ShopBanner';
import ShopCategories from '../../components/partials/shop/ShopCategories';
import ProductTagView from '../../components/partials/shop/ProductTagView';
import ShopWidget from '../../components/partials/shop/modules/ShopWidget';

import BestSaleItems from '../../components/partials/shop/modules/BestSaleItems';
import RecommendItems from '../../components/partials/shop/modules/RecommendItems';
import {
    getProducts,
    getTotalProducts,
    getProductsByCategory,
    getProductsById,
} from '../../store/product/action';

import { getCollections } from '../../store/collection/action';

class ShopDefaultPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log('[I am testing]')
    }

    static async getInitialProps(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        const { query } = this.props;
        if (query) {
            if (query.category) {
                this.props.dispatch(getProductsByCategory(query.category));
            } else {
                const params = {
                    _start: 1,
                    _limit: 12,
                };
                this.props.dispatch(getProducts(params));
                this.props.dispatch(getTotalProducts());
            }
            const collectionsParams = [
                'shop_best_sale_items',
                'shop-recommend-items',
            ];
            this.props.dispatch(getCollections(collectionsParams));
        }
    }

    render() {
        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Shop Default',
            },
        ];
        return (
            <div className="site-content">
                <HeaderMobile />
                <ShopBanner/>
                <HeaderDefault />
                <NavigationList />
                <div className="ps-page--shop  pr-10 pl-10">
                    <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                    <div className="ps-container">
                        <ShopBrands />
                        <ShopCategories />
                        <ProductTagView />
                        <BestSaleItems collectionSlug="shop_best_sale_items" />
                        <RecommendItems collectionSlug="shop-recommend-items" />
                        <div className="ps-layout--shop">
                            <ShopWidget />
                            <div className="ps-layout__right">
                                <LayoutShop />
                            </div>
                        </div>
                    </div>
                </div>
                <Newletters layout="container" />
                <FooterDefault />
            </div>
        );
    }
}
export default connect(state => state)(ShopDefaultPage);
