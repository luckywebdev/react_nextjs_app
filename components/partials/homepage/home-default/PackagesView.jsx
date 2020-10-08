import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import PackageDealOfDay from '../../../elements/products/PackageDealOfDay';
import { packagecarouselInSidebar } from '../../../../utilities/carousel-helpers';

import packages from '../../../../public/static/data/packages.json';
const packageData = packages.packages;

class PackagesView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { collections } = this.props;
        return (
            <div className="ps-deal-of-day">
                <div className="ps-container">
                    <div className="">
                        <div className="ps-block--countdown-deal">
                            <div className="ps-block__left">
                                <h3>Packages</h3>
                            </div>
                        </div>
                    </div>
                    <div className="ps-section__content">
                        <Slider
                            {...packagecarouselInSidebar}
                            className="ps-carousel outside">
                            {packageData.map(product => (
                                <PackageDealOfDay
                                    product={product}
                                    key={product.project_name}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state.collection)(PackagesView);
