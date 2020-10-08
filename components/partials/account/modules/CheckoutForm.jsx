import React, { Component } from 'react';
import { connect } from 'react-redux';

import { injectStripe, CardNumberElement, CardCVCElement, CardExpiryElement } from 'react-stripe-elements';
import { Select, notification  } from 'antd';
import Form from 'antd/lib/form/Form';
import Axios from 'axios';

const { Option } = Select;

const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          lineHeight: '50px',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#c23d4b',
        },
      }
    }
  };
  
  
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    openNotification = (title, content) => {
        notification.open({
          message: title,
          description: content,
        });
      };

    handleChange = ({ error }) => {

        if (error) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: '' });
        }
      };  
      handleChangeCardData = e => {
          this.setState({
              [e.target.name]: e.target.value
          })
      }

    handlePaymentSubmit = e => {
        e.preventDefault();
        if( this.props.stripe){
        this.setState({
            formProcess: true
        });
        this.props.stripe.createToken({email: this.props.userInfo.email, address_city: this.props.userInfo.city, name: this.state.name}).then((response) => {
            console.log("response====", response);
            if(response.token){
                let reqdata = {
                    amount: this.props.amount,
                    token: response.token.id,
                    email: this.props.userInfo.email,
                    address_city: this.props.userInfo.city,
                    name: this.state.name
                }
                Axios.post("http://localhost:3001/api/payment", reqdata).
                then(res => {
                    console.log("api_response", res);
                    if(res.status === 200){
                        if(res.data.payment_result.status === "succeeded"){
                            console.log("payment_result", res.data.payment_result);
                            this.openNotification("Payment is Succeedd", "");
                        }
                        else{
                            console.log("payment_result: failed");
                            this.openNotification("Payment is Failed-1", "");
                        }
                    }
                    else {
                        console.log("payment_result: failed");
                        this.openNotification("Payment is Failed-2", "");
                    }
                })
            }
        });
        }
    }

    render() {
        return (

            <Form>
                {/* <CardElement onChange={this.handleChange} {...createOptions()} /> */}

                <div className="ps-block__tab" id="card">
                    <div className="form-group">
                        <label>
                            Card Number
                        </label>
                        <CardNumberElement className={'StripeElement'} onChange={this.handleChange} {...createOptions()} />
                    </div>
                    <div className="form-group">
                        <label>
                            Card Holders
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            // style={{backgroundColor: 'transparent'}}
                            onChange={ this.handleChangeCardData }
                        />
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="form-group">
                                <label>
                                    Expiration
                                    Date
                                </label>
                                <CardExpiryElement onChange={this.handleChange} {...createOptions()} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label>
                                    CVV
                                </label>
                                <CardCVCElement onChange={this.handleChange} {...createOptions()} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="ps-btn ps-btn--fullwidth" onClick={ this.handlePaymentSubmit }>
                            Submit
                        </button>
                    </div>

                </div>
            </Form>
        );
    }
}

export default injectStripe(CheckoutForm);
// export default CheckoutForm;
