import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, addDelivery } from '../../../store/cart/action';
import delivery1 from '../../../public/static/data/delivery/delivery1_cities.json';
import delivery2 from '../../../public/static/data/delivery/delivery2_cities.json';
import delivery1_department from '../../../public/static/data/delivery/delivery1_departments.json';
import delivery2_department from '../../../public/static/data/delivery/delivery2_departments.json';

import { Radio, Select, Tooltip } from 'antd';
import Link from 'next/link';

const { Option } = Select;

class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 0,
            cityList: [],
            departmentList: [],
            selectedCity: 0,
            defaultCity: 0,
            defaultDepartment: 0,
            currentCity: '',
            deliveryMethod: [
                {id: 1, name: "delivery1"},
                {id: 2, name: "delivery2"},
                {id: 3, name: "delivery3"}
            ]
        };
    }

    componentDidMount() {
        let currentCity = '';
        if(this.props.locations.city)
            currentCity = this.props.locations.city;
        this.props.dispatch(getCart());
        this.setState({
            currentCity: currentCity,
            cityList: delivery1.result.map(item => { return {name: item.title_en} }),
            departmentList: delivery1_department.result.filter(item => item.locality === delivery1.result[0].title_en ).map(res => { return {name: res.description, tooltip: res.adress} }),
            defaultCity: delivery1.result.map(item => { return {name: item.title_en} })[0].name,
            selectedCity: delivery1.result.map(item => { return {name: item.title_en} })[0].name,
            defaultDepartment: 0
        }, function() {
            this.props.dispatch(addDelivery({deliveryMethod: 'delivery1', cityName: this.state.cityList[0].title_en, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
        });
    }
    handleChangeDeliveryMethod = e => {
        let matchedCityIndex = -1;
        const methodValue = e.target.value;
        if(this.state.currentCity !== ''){
            switch (methodValue) {
                case 0:
                    matchedCityIndex = delivery1.result.findIndex(item => item.title_en.toLowerCase() === this.state.currentCity.toLowerCase());
                    break;
                case 1:
                    matchedCityIndex = delivery2.data.findIndex(item => item.Description.toLowerCase() === this.state.currentCity.toLowerCase());
                    break;
                case 2:
                    matchedCityIndex = delivery1.result.findIndex(item => item.title_en.toLowerCase() === this.state.currentCity.toLowerCase());
                    break;        
            }
        }
        switch (methodValue) {
            case 0:
                this.setState({
                    method: methodValue,
                    selectedCity: delivery1.result.map(item => { return {name: item.title_en} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    defaultDepartment: 0,
                    cityList: delivery1.result.map(item => { return {name: item.title_en} }),
                    defaultCity: delivery1.result.map(item => { return {name: item.title_en} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    departmentList: delivery1_department.result.filter(item => item.locality === delivery1.result[matchedCityIndex !== -1 ? matchedCityIndex : 0].title_en).map(res => { return {name: res.description, tooltip: res.adress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery1", cityName: this.state.cityList[matchedCityIndex !== -1 ? matchedCityIndex : 0].name, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
            case 1:
                this.setState({
                    method: methodValue,
                    selectedCity: delivery2.data.map(item => { return {name: item.Description, Ref: item.Ref} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    defaultDepartment: 0,
                    cityList: delivery2.data.map(item => { return {name: item.Description, Ref: item.Ref} }),
                    defaultCity: delivery2.data.map(item => { return {name: item.Description, Ref: item.Ref} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    departmentList: delivery2_department.data.filter(item => item.CityRef === delivery2.data[matchedCityIndex !== -1 ? matchedCityIndex : 0].Ref).map(res => { return {name: res.Description, Ref: res.CityRef, tooltip: res.ShortAddress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery2", cityName: this.state.cityList[matchedCityIndex !== -1 ? matchedCityIndex : 0].name, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
            case 2:
                this.setState({
                    method: methodValue,
                    selectedCity: delivery1.result.map(item => { return {name: item.title_en} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    defaultDepartment: 0,
                    cityList: delivery1.result.map(item => { return {name: item.title_en} }),
                    defaultCity: delivery1.result.map(item => { return {name: item.title_en} })[matchedCityIndex !== -1 ? matchedCityIndex : 0].name,
                    departmentList: delivery1_department.result.filter(item => item.locality === delivery1.result[matchedCityIndex !== -1 ? matchedCityIndex : 0].title_en).map(res => { return {name: res.description, tooltip: res.adress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery1", cityName: this.state.cityList[matchedCityIndex !== -1 ? matchedCityIndex : 0].name, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
        }
    };
    handleChangeCity = (value, event) => {
        switch (this.state.method) {
            case 0:
                this.setState({
                    selectedCity: value,
                    defaultDepartment: 0,
                    departmentList: delivery1_department.result.filter(item => item.locality === value).map(res => { return {name: res.description, tooltip: res.adress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery1", cityName: value, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
            case 1:
                this.setState({
                    selectedCity: value,
                    defaultDepartment: 0,
                    departmentList: delivery2_department.data.filter(item => item.CityRef === this.state.cityList.filter(item => item.name === value)[0].Ref).map(res => { return {name: res.Description, tooltip: res.ShortAddress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery2", cityName: value, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
            case 2:
                this.setState({
                    selectedCity: value,
                    defaultDepartment: 0,
                    departmentList: delivery1_department.result.filter(item => item.locality === value).map(res => { return {name: res.description, tooltip: res.adress} })
                }, function() {
                    this.props.dispatch(addDelivery({deliveryMethod: "delivery1", cityName: value, department: this.state.departmentList ? this.state.departmentList[0].name : ''}));
                });
                break;
        }
    };


    render() {
        const { amount, cartItems, discount } = this.props;
        const amountDiscounted = discount === '' ? amount : (amount * (100 - discount) / 100).toFixed(2);
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shipping Information</h1>
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
                                    <h4>Delivery Method</h4>
                                    <div className="ps-block__panel">
                                        <Radio.Group
                                            onChange={e =>
                                                this.handleChangeDeliveryMethod(
                                                    e
                                                )
                                            }
                                            value={this.state.method}>
                                            {
                                                this.state.deliveryMethod.map((item, index) => (
                                                    <Radio value={index} key={index}>
                                                        {item.name}
                                                    </Radio>
                                                ))
                                            }
                                        </Radio.Group>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="control-label">City</label>

                                                    <Select
                                                        onSelect={(value, event) => this.handleChangeCity(value, event)}
                                                        defaultValue={
                                                            this.state.defaultCity
                                                        }                                                        
                                                        value={
                                                            this.state.selectedCity
                                                        }
                                                        showSearch={true}
                                                        >
                                                        {this.state.cityList.map(
                                                            (item, index) => (
                                                                <Option
                                                                    value={
                                                                        item.name
                                                                    }
                                                                    key={
                                                                        index
                                                                    }>
                                                                    {
                                                                        item.name
                                                                    }
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>

                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="control-label">Departments</label>
                                                    <Select
                                                        defaultValue={
                                                            this.state.defaultDepartment
                                                        }>
                                                        {this.state.departmentList.map(
                                                            (item, index) => (
                                                                <Option
                                                                    value={
                                                                        index
                                                                    }
                                                                    key={
                                                                        index
                                                                    }>
                                                                    <Tooltip  title={item.tooltip}>
                                                                    {
                                                                        item.name
                                                                    }
                                                                    </Tooltip>
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>
                                        <Link href="/account/payment">
                                            <a className="ps-btn">
                                                Continue to payment
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
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
    return {...state.cart, ...state.collection };
};
export default connect(mapStateToProps)(Shipping);
