import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {

    componentDidMount() {
        //console.log(this.props);
        if (this.props.totalPrice === 0) {
            this.props.history.push('/');
        }
    }

    goBackBuilder = () => {
        this.props.history.push('');
    };

    checkoutContinue = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {

        return (
            <div>
                {/*{console.log(this.props.location.state.ingredients)}*/}
                <CheckoutSummary goBackBuilder={this.goBackBuilder}
                                 checkoutContinue={this.checkoutContinue}
                                 ingredients={this.props.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'}
                       component={() => <ContactData
                           history={this.props.history}
                          />}/>
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        ...state.burger
    }
};


export default connect(mapStateToProps)(Checkout)