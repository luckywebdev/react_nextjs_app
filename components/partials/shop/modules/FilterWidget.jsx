import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Slider, Checkbox } from 'antd';

import {
    getProducts,
    getTotalProducts,
    getProductsByPrice,
    getBrands,
    getProductsByBrand,
    getProductCategories,
    getProductsByCategory,
} from '../../../../store/product/action';

class FilterWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceMin: 0,
            priceMax: 2000,
        };
    }

    handleChangeRange(value) {
        this.setState({
            priceMin: value[0],
            priceMax: value[1],
        });
        const params = {
            price_gt: value[0],
            price_lt: value[1],
            _start: 1,
            _limit: 999,
        };
        this.props.dispatch(getProductsByPrice(params));
    }

    handleFilterByBrand(value) {
        if (value.length > 0) {
            this.props.dispatch(getProductsByBrand(value));
            Router.push({ pathname: '/shop', query: { brand: value } });
        } else {
            const params = {
                _start: 1,
                _limit: 12,
            };
            this.props.dispatch(getProducts(params));
            this.props.dispatch(getTotalProducts());
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getProductCategories());
    }
    
    render() {
        const { brands, categories, allProducts } = this.props;
        const brandsGroup = [];
        if (brands.length > 0) {
            brands.forEach(brand => {
                brandsGroup.push({
                    id: brand.id,
                    value: brand.id,
                    label: brand.name,
                });
            });
        }
        return (
            <div className="ps-shopping__filter" >
                <p>
                    <strong >Filter</strong>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.product;
};
export default connect(mapStateToProps)(FilterWidget);
