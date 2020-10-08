import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import ProductResult from '../../../elements/products/ProductSearchResult';
import { connect } from 'react-redux';
import { getProductsByKeyword } from '../../../../store/product/action';
import LanguageSwicher from './LanguageSwicher'

import '../../../../scss/custom.scss';

class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPanel: false,
            keyword: '',
        };
    }

    searchByProductName = (keyword, object) => {
        let matches = [];
        let regexp = new RegExp(keyword.toLowerCase(), 'g');

        object.forEach(product => {
            if (product.title.toLowerCase().match(regexp))
                matches.push(product);
        });

        return matches;
    };

    handleSearch(e) {
        if (e.target.value !== '') {
            const keyword = e.target.value;
            this.props.dispatch(getProductsByKeyword(keyword));
            this.setState({
                searchPanel: true,
                keyword: e.target.value
            });
        } else {
            this.setState({ searchPanel: false, searchProducts: [] });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const keyword = this.state.keyword;
        Router.push(`/search?keyword=${keyword}`);
    }

    render() {
        const { searchPanel } = this.state;
        const {searchResults} = this.props;
        const exampleCategories = [
            'All',
            'Babies & Moms',
            'Books & Office',
            'Cars & Motocycles',
            'Clothing & Apparel',
            ' Accessories',
            'Bags',
            'Kid’s Fashion',
            'Mens',
            'Shoes',
            'Sunglasses',
            'Womens',
            'Computers & Technologies',
            'Desktop PC',
            'Laptop',
            'Smartphones',
            'Consumer Electrics',
            'Air Conditioners',
            'Accessories',
            'Type Hanging Cell',
            'Audios & Theaters',
            'Headphone',
            'Home Theater System',
            'Speakers',
            'Car Electronics',
            'Audio & Video',
            'Car Security',
            'Radar Detector',
            'Vehicle GPS',
            'Office Electronics',
            'Printers',
            'Projectors',
            'Scanners',
            'Store & Business',
            'Refrigerators',
            'TV Televisions',
            '4K Ultra HD TVs',
            'LED TVs',
            'OLED TVs',
            'Washing Machines',
            'Type Drying Clothes',
            'Type Horizontal',
            'Type Vertical',
            'Garden & Kitchen',
            'Cookware',
            'Decoration',
            'Furniture',
            'Garden Tools',
            'Home Improvement',
            'Powers And Hand Tools',
            'Utensil & Gadget',
            'Health & Beauty',
            'Equipments',
            'Hair Care',
            'Perfumer',
            'Wine Cabinets',
        ];
        return (
            <div className="row-search">
                <LanguageSwicher />
                <form
                    className="ps-form--quick-search"
                    method="get"
                    action="/"
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className="header-search-input-container">
                        <input className="header-search-input"
                            type="text"
                            placeholder="I'm shopping for..."
                            onChange={this.handleSearch.bind(this)}
                        />
                        <img className="appendImages"  src="/static/img/search_blue.png"/>
                    </div>
                    <div
                        className={`ps-panel--search-result panel-width${
                            searchPanel && searchPanel === true ? ' active ' : ''
                        }`}>
                        <div className="ps-panel__content panel-width">
                            {searchResults && searchResults.length > 0 ? (
                                searchResults.map(product => (
                                    <ProductResult
                                        product={product}
                                        key={product.id}
                                    />
                                ))
                            ) : (
                                <span>Not found! Try with another keyword.</span>
                            )}
                        </div>
                        <div className="ps-panel__footer text-center">
                            <Link href="/search">
                                <a>See all results</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(state=> state.product)(SearchHeader);
