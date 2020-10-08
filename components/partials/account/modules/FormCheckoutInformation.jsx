import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { voucherDiscount, userInfoSave } from '../../../../store/cart/action';

import voucher from '../../../../public/static/data/voucher.json';

import { Form, Input } from 'antd';


class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voucherData: [],
            voucherSelected: [],
            name: '',
            firstName: '',
            lastName: '',
            address:'',
            city:'',
            postalCode: ''
        }
    }
    componentDidMount(){
        this.setState({
            voucherData:  voucher.vouchers
        });
    }

    handlePersonalInfoInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLoginSubmit = () => {
        let userInfo = {
            email: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            postalCode: this.state.postalCode
        }
        this.props.dispatch(userInfoSave({userInfo}));
        Router.push('/account/shipping');
    };
    handleChaneVoucher=(txt)=>{
        let index  = this.state.voucherData.filter((item, index) => {return txt === item.code});
        this.setState({
            voucherSelected: index
        }, function() {
            if(this.state.voucherSelected.length !== 0) {
                this.props.dispatch(voucherDiscount({discount: this.state.voucherSelected[0].discount}));
            }
            else{
                this.props.dispatch(voucherDiscount({discount: 0}));
            }
        })
        // this.setState({discount:index.discount})

    }

    render() {
        const { amount, cartItems, cartTotal, discount } = this.props;
        const amountDiscounted = discount === '' ? amount : (amount * (100 - discount) / 100).toFixed(2)
        return (
            <Form
                className="ps-form--checkout"
                onFinish={this.handleLoginSubmit}
                >
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-form__billing-info">
                                <h3 className="ps-form__heading">
                                    Contact information
                                </h3>
                                <div className="form-group">
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: false,
                                                message:
                                                    'Enter an email or mobile phone number!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Email or phone number"
                                            onChange={this.handlePersonalInfoInput}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="keep-update"
                                        />
                                        <label htmlFor="keep-update">
                                            Keep me up to date on news and
                                            exclusive offers?
                                        </label>
                                    </div>
                                </div>
                                <h3 className="ps-form__heading">
                                    Shipping address
                                </h3>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="First Name"
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message:
                                                            'Enter your first name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    onClick={this.handlePersonalInfoInput}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Last Name"
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message:
                                                            'Enter your last name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    name="lastName"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    onChange={this.handlePersonalInfoInput}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="address"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="address"
                                            onChange={this.handlePersonalInfoInput}
                                            placeholder="Address"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="apartment"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an Apartment!'

                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Apartment, suite, etc. (optional)"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="city"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter a city!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="city"
                                                    name="city"
                                                    placeholder="City"
                                                    onChange={this.handlePersonalInfoInput}
                                                />
                                            </Form.Item>

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="postalCode"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter a postal oce!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    name="postalCode"
                                                    type="postalCode"
                                                    placeholder="Postal Code"
                                                    onChange={this.handlePersonalInfoInput}
                                                    />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="vouchercode"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter a voucher code!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Voucher Code"
                                                    onChange={(e)=>this.handleChaneVoucher(e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 ps-form__submit">
                                        <div className="form-group">
                                            <strong>
                                                {discount}
                                                %
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="keep-update"
                                        />
                                        <label htmlFor="keep-update">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div>
                                <div className="ps-form__submit">
                                    <Link href="/account/cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shopping cart
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className="ps-btn">
                                            Continue to shipping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>Your order</h3>
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
                                                            {product.title}
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
                                        <figure className="ps-block__shipping">
                                            <h3>Shipping</h3>
                                            <p>Calculated at next step</p>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}
const mapStateToProps = state => {
    return state.cart;
};


export default connect(mapStateToProps)(FormCheckoutInformation);
