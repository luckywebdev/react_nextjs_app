import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Radio, Select } from 'antd';
import { getCart } from '../../../store/cart/action';
import CheckoutForm from './modules/CheckoutForm';

const { Option } = Select;
// const stripePromise = "pk_test_ijvgfy2Lp9ev4kGXWm1TWAWK00OLOkDJq9";
const stripePromise = "pk_test_51GsJEqALCR9ctSLfq5ziiKsmM7kgR2ELbIVbbrMqPOztfHYHBNjJU9BVH2mXBEmjbQsUCuLTutBYzqC6YY5mMlRN00D6aBE4DS";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 1,
        };
    }

    handleChangePaymentMethod = e => {
        this.setState({ method: e.target.value });
    };

    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.props.dispatch(getCart());
        }
        else{
            Router.push('./');
        }
    }

    render() {
        const { amount, cartItems, discount, userInfo } = this.props;
        const amountDiscounted = discount === '' ? amount : (amount * (100 - discount) / 100).toFixed(2)

        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Payment</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>test@gmail.com</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                                2015 South Street, Midland,
                                                Texas
                                            </p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div>
                                    <h4>Payment Methods</h4>

                                    <div className="ps-block--payment-method">
                                        <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={e =>
                                                    this.handleChangePaymentMethod(
                                                        e
                                                    )
                                                }
                                                value={this.state.method}>
                                                <Radio value={1}>
                                                    Visa / Master Card
                                                </Radio>
                                                <Radio value={2}>Paypal</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div className="ps-block__content">
                                        {
                                            this.state.method === 1 ? (
                                                <StripeProvider apiKey={stripePromise}>
                                                    <div className="example">
                                                        <Elements>
                                                            <CheckoutForm amount={parseInt(amountDiscounted) + 20} userInfo={userInfo} />
                                                        </Elements>
                                                    </div>
                                                </StripeProvider>

                                            ) : (
                                                <div className="ps-block__tab">
                                                    <a className="ps-btn">
                                                        Process with Paypal
                                                    </a>
                                                </div>
                                            )
                                        }
                                        </div>
                                    </div>

                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                <div className="ps-form__orders">
                                    <div className="ps-block--checkout-order">
                                        <div className="ps-block__content">
                                            <figure>
                                                <figcaption>
                                                    <strong>Product</strong>
                                                    <strong>total</strong>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__items">
                                                {cartItems &&
                                                    cartItems.map(product => (
                                                        <Link
                                                            href="/"
                                                            key={product.id}>
                                                            <a>
                                                                <strong>
                                                                    {
                                                                        product.title
                                                                    }
                                                                    <span>
                                                                        x
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </span>
                                                                </strong>
                                                                <small>
                                                                    $
                                                                    {product.quantity *
                                                                        product.price}
                                                                </small>
                                                            </a>
                                                        </Link>
                                                    ))}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal</strong>
                                                    <small>${amount}</small>
                                                </figcaption>
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal Discounted</strong>
                                                    <small>${amountDiscounted}</small>
                                                </figcaption>
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Shipping</strong>
                                                    <small>$20.00</small>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                        ${parseInt(amountDiscounted) + 20}
                                                        .00
                                                    </strong>
                                                </h3>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(Payment);
