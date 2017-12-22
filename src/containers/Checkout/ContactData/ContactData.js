import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classCSS from './ContactData.css';
import axios from '../../../axios-orders';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        customer: {
            name: '',
            email: '',
            address: {
                country: '',
                street: ''
            }
        },
        totalPrice: null,
        ingredients: null,
        deliveryMethod: null,
        loading: false
    };

    componentDidMount() {
        if (typeof this.props.ingredients !== "undefined") {
            this.setState({
                ingredients: this.props.ingredients,
                totalPrice: this.props.totalPrice
            })
        }
    }

    handleInput = (type) => event => {
        const {data} = this.state.customer;
        const newData = {
            ...data,
            [type] : event.target.value
        };
        const customer = {...this.state.customer};
        customer[type] = event.target.value;

        const address = {...this.state.customer.address};
        address[type] = event.target.value;

        customer['address'] = address;



        this.setState({customer:newData});
    };

    submitOrder = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: this.state.customer,
            deliveryMethod: this.state.deliveryMethod
        };
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    order: false
                });
            });
    };

    render() {
        return (
            <div className={classCSS.ContactData}>
                <Modal show={this.state.loading}>
                    <Spinner/>
                </Modal>
                <h4>Please fill out this form</h4>

                <label htmlFor="name">Name</label><br/>
                <input type="text" id="name"
                       onChange={this.handleInput('name')}/> <br/>

                <label htmlFor="email">Email</label><br/>
                <input type="text" id="email"
                       onChange={this.handleInput('email')}/><br/>

                <label htmlFor="street">Street</label><br/>
                <input type="text" id="street"
                       onChange={this.handleInput('street')}/><br/>

                <label htmlFor="country">Country</label><br/>
                <input type="text" id="country"
                       onChange={this.handleInput('country')}/><br/>

                <label htmlFor="deliveryMethod">Delivery Method</label><br/>
                <input type="text" id="deliveryMethod"
                       onChange={this.handleInput('deliveryMethod')}/><br/>

                <Button action={'Success'} clicked={this.submitOrder}>
                    Submit
                </Button>

            </div>
        );
    }


}

export default ContactData;