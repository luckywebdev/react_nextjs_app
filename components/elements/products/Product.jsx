import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import { Modal } from 'antd';
import { CheckSquareFilled, CloseSquareFilled } from '@ant-design/icons';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';
import { baseUrl } from '../../../repositories/Repository';
import { formatCurrency } from '../../../utilities/product-helper';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import { isStaticData } from '../../../utilities/app-settings';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
        };
    }

    handleAddItemToCart = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleShowQuickView = (e) => {
        e.preventDefault();
        this.setState({ isQuickView: true });
    };

    handleHideQuickView = (e) => {
        e.preventDefault();
        this.setState({ isQuickView: false });
    };

    render() {
        const { product, currency } = this.props;
        let productBadge = null;
        if (product.badge && product.badge !== null) {
            product.badge.map((badge) => {
                if (badge.type === 'sale') {
                    return (productBadge = (
                        <div className="ps-product__badge">{badge.value}</div>
                    ));
                } else if (badge.type === 'outStock') {
                    return (productBadge = (
                        <div className="ps-product__badge out-stock">
                            {badge.value}
                        </div>
                    ));
                } else {
                    return (productBadge = (
                        <div className="ps-product__badge hot">
                            {badge.value}
                        </div>
                    ));
                }
            });
        }
        return (
            <div className="ps-product">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a>
                            <LazyLoad>
                                <img
                                    src={
                                        isStaticData === false
                                            ? `${baseUrl}${product.thumbnail.url}`
                                            : product.thumbnail.url
                                    }
                                    alt="martfury"
                                />
                            </LazyLoad>
                        </a>
                    </Link>
                    {product.is_sale === true && <div className="ps-product-badge">
                        <div className="ps-product-sol-con">
                            <div className="ps-product-solution">
                                Solution
                            </div>
                            <div className="ps-product-rimless">
                                RIMLESS
                            </div>
                        </div>
                        <div className = "ps-product-percent">
                            -30%
                        </div>
                    </div>}
                    {product.badge ? productBadge : ''}
                    <ul className="ps-product__actions">
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Read More"
                                onClick={this.handleAddItemToCart.bind(this)}>
                                <i className="icon-bag2"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={this.handleShowQuickView.bind(this)}>
                                <i className="icon-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to wishlist"
                                onClick={this.handleAddItemToWishlist.bind(
                                    this
                                )}>
                                <i className="icon-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Compare"
                                onClick={this.handleAddItemToCompare.bind(
                                    this
                                )}>
                                <i className="icon-chart-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-product__container">
                    <Link href="/shop">
                        <a className="ps-product__vendor">Young Shop</a>
                    </Link>
                    <div className="ps-produc__line"></div>
                    <div className="ps-product__content">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.id}`}>
                            <a className="ps-product__title">{product.title}</a>
                        </Link>
                        {/* <div className="ps-product__rating">
                            <Rating />
                            <span>{product.ratingCount}</span>
                        </div> */}
                        <div className="ps-product__scale">Scale:</div>
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale mt-20">
                                <span>
                                    {formatCurrency(product.price)}{' '}
                                    {currency ? ' ' + currency.text.toLowerCase() + '.' : ' USD'}
                                </span>
                                <del className="ml-2">
                                    {formatCurrency(product.sale_price)}
                                    {currency ? ' ' + currency.text : ' USD'}
                                </del>
                            </p>
                        ) : (
                            <p className="ps-product__price mt-20">
                                {formatCurrency(product.price)}
                                {currency ? ' ' + currency.text.toLowerCase() + '.' : ' USD'}
                            </p>
                        )}
                        <div className="ps-product__available ps-product__space">
                            {product.is_sale ?
                                <CheckSquareFilled className="available_icon" />:
                                <CloseSquareFilled className="available_icon"/>
                            }
                            <label className="available_label">
                                { product.is_sale ? 'available ' + `${product.inventory}` + ' pcs': 'not available' }
                            </label>
                        </div>
                    </div>
                    <div className="ps-product__content hover">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.id}`}>
                            <a className="ps-product__title">{product.title}</a>
                        </Link>
                        <span >Scale:</span>
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale mt-20">
                                <span>
                                    {formatCurrency(product.price)}{' '}
                                    {currency ? ' ' + currency.text.toLowerCase() + '.' : ' USD'}
                                </span>
                                <del className="ml-2">
                                    {product.sale_price}
                                    {currency ?' ' +  currency.text : ' USD'}
                                </del>
                            </p>
                        ) : (
                            <p className="ps-product__price mt-20">
                                {formatCurrency(product.price)}
                                {currency ? ' ' + currency.text.toLowerCase() + '.' : ' USD'}
                            </p>
                        )}
                        <div className="ps-product__available">
                            {product.is_sale ?
                                <CheckSquareFilled className="available_icon" />:
                                <CloseSquareFilled className="available_icon"/>
                            }
                            <label className="available_label">
                                { product.is_sale ? 'available ' + `${product.inventory}` + ' pcs': 'not available' }
                            </label>
                        </div>                    

                    </div>
                </div>
                <Modal
                    title={product.title}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={this.handleHideQuickView}
                    visible={this.state.isQuickView}>
                    <ProductDetailQuickView product={product} />
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(Product);