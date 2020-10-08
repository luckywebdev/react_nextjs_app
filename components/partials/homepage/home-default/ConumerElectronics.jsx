import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Slider from 'react-slick';
import Product from '../../../elements/products/Product';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { carouselFullwidth } from '../../../../utilities/carousel-helpers';

class ConsumerElectronics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            activeCategory: 'newArrivals',
        };
    }

    handleChangeProduct(e, products, currentItem) {
        e.preventDefault();
        this.setState({
            currentProducts: products,
            activeCategory: currentItem,
        });
    }

    render() {
        const { collections, collectionSlug } = this.props;
        const { activeCategory } = this.state;
        const products = getColletionBySlug(collections, collectionSlug);
        const sectionLinks = [
            {
                title: 'New Arrivals',
                products: products,
                name: 'newArrivals',
            },
            {
                title: 'Best seller',
                products: products,
                name: 'bestSeller',
            },
            {
                title: 'Most Popular',
                products: products,
                name: 'mostPopular',
            },
        ];
        return (
            <div className="ps-product-list ps-garden-kitchen">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>Consumer Electronics</h3>
                        <ul className="ps-section__links">
                            {sectionLinks.map(link => (
                                <li
                                    className={
                                        activeCategory === link.name
                                            ? 'active'
                                            : ''
                                    }
                                    key={link.name}>
                                    <a
                                        onClick={e =>
                                            this.handleChangeProduct(
                                                e,
                                                link.products,
                                                link.name
                                            )
                                        }>
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link href="/shop">
                                    <a>View All</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">
                        {products.length > 0 ? (
                            <Slider
                                {...carouselFullwidth}
                                className="ps-carousel outside">
                                {products.map(product => (
                                    <div className="item" key={product.id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state.collection)(ConsumerElectronics);
