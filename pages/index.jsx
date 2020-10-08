import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import SiteFeatures from '../components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '../components/partials/homepage/home-default/HomeAdsColumns';
import ConumerElectronics from '../components/partials/homepage/home-default/ConumerElectronics';
import Clothings from '../components/partials/homepage/home-default/Clothings';
import GardenAndKitchen from '../components/partials/homepage/home-default/GardenAndKitchen';
import HomeAds from '../components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '../components/partials/commons/DownLoadApp';
import NewArrivals from '../components/partials/homepage/home-default/NewArrivals';
import Newletters from '../components/partials/commons/Newletters';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import HomeDefaultDealOfDay from '../components/partials/homepage/home-default/HomeDefaultDealOfDay';
import PackagesView from '../components/partials/homepage/home-default/PackagesView';
import ShopBrands from '../components/partials/shop/ShopBrands';
import HomeDefaultTopCategories from '../components/partials/homepage/home-default/HomeDefaultTopCategories';
import SubscribePopup from '../components/shared/SubscribePopup';
import '../scss/home-default.scss';
import { getCollections } from '../store/collection/action';
import { getGeolocations } from '../store/collection/action';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribe: false,
        };
    }

    static async getInitialProps(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        const { query } = this.props;
        if (query) {
            const collectionsSlug = [
                'deal_of_the_day',
                'consumer_electronics',
                'clothings',
                'garden_and_kitchen',
                'new_arrivals_products',
            ];
            this.props.dispatch(getCollections(collectionsSlug));
            this.props.dispatch(getGeolocations());
        }
        setTimeout(() => {
            this.setState({ subscribe: false });
        }, 10000);
    }

    render() {
        console.log("this.props: ===", this.props.locations);
        const { subscribe } = this.state;
        return (
            <div className="site-content">
                <HeaderMobile />
                <NavigationList />
                <HomeBanner />
                <HeaderDefault />
                <SubscribePopup active={subscribe} />
                <main id="homepage-1" className="mr-50 ml-50">
                    <SiteFeatures />
                    <HomeDefaultDealOfDay collectionSlug="deal_of_the_day" />
                    <PackagesView />
                    <ShopBrands />
                    <HomeAdsColumns />
                    <HomeDefaultTopCategories />
                    <ConumerElectronics collectionSlug="consumer_electronics" />
                    <Clothings collectionSlug="clothings" />
                    <GardenAndKitchen collectionSlug="garden_and_kitchen" />
                    <HomeAds />
                    <DownLoadApp />
                    <NewArrivals collectionSlug="new_arrivals_products" />
                    <Newletters />
                </main>
                <FooterFullwidth />
            </div>
        );
    }
}


export default connect(state => state.collection)(Index);
