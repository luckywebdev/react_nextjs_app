import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import Link from 'next/link';
import { baseUrl } from '../../../repositories/Repository';
import LazyLoad from 'react-lazyload';

class PackageDealOfDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
        };
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleShowQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: true });
    };

    handleHideQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: false });
    };

    render() {
        const { product } = this.props;
        let thumbnail=product.img;
        console.log(thumbnail)
        return (
            <div className="ps-product ps-product--inner">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a>
                            <LazyLoad>
                                <img src={thumbnail} alt="martfury" />
                            </LazyLoad>
                        </a>
                    </Link>
                    <div className="ps-package-mark">
                        Package
                    </div>
                    <div className="ps-package-footer">
                        <div className="ps-package-footer__left">
                            <div className="up_row">
                                <div >
                                    <div>DESIGN BY</div>
                                    <div className="line-35"></div>
                                </div>
                                <div >
                                    <span>{product.designer.name}</span>
                                    <div className="line-65"></div>
                                </div>
                            </div>
                            <div className="down_row">
                                 <div>PROJECT NAME</div>
                                 <div>
                                     <a >{product.project_name}</a>
                                 </div>
                            </div>
                        </div>
                        <div className="ps-package-footer__right">
                            <div className="avatar_image">
                                <img src={product.designer.avatar} alt="martfury" />
                            </div>
                            <div className="avatar_name">
                                <p>studio</p>
                                <p>{product.designer.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-package_footer mt-5 pr-4 pl-4 ">
                    
                    <div className="ps-product__solution">
                        Solution {product.solution_number}
                    </div>
                    <div className="ps-produc__line"></div>
                    <div className="ps-product__desc row ml-0 mr-0">
                        {product.description}
                    </div>
                    <div className="row ml-0 mr-0 mt-3">
                        {product.price} {product.currency}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(PackageDealOfDay);
