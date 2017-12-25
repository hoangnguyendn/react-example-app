import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classCSS from './ContactData.css';
import axios from '../../../axios-orders';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Country',
                },
                value: ''
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Plane', display: 'Plane'},
                        {value: 'Ship', display: 'Ship'},
                        {value: 'Bike', display: 'Bike'}
                    ],
                },
                value: ''
            }
        },
        totalPrice: null,
        ingredients: null,
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
        // const {data} = this.state.customer;
        // const newData = {
        //     ...data,
        //     [type]: event.target.value
        // };
        // const customer = {...this.state.customer};
        // customer[type] = event.target.value;
        //
        // const address = {...this.state.customer.address};
        // address[type] = event.target.value;
        //
        // customer['address'] = address;

        const orderForm = {...this.state.orderForm};
        orderForm[type].value = event.target.value;
        this.setState({orderForm: orderForm});
    };

    submitOrder = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: this.state.orderForm.name.value,
                email: this.state.orderForm.email.value,
                country: this.state.orderForm.country.value,
                street: this.state.orderForm.street.value
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        };
        axios.post('/orders.json', order)
            .then(res => {
                //console.log(res);
                this.setState({
                    loading: false,
                });
            })
            .catch(err => {
                //console.log(err);
                this.setState({
                    loading: false,
                    order: false
                });
            });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        //console.log(formElementArray);
        return (
            <div className={classCSS.ContactData}>
                <Modal show={this.state.loading}>
                    <Spinner/>
                </Modal>
                <h4>Please fill out this form</h4>
                {formElementArray.map(form => {
                    return <Input key={form.id}
                                  inputtype={form.config.elementType}
                                  type={form.config.elementConfig.type}
                                  placeholder={form.config.elementConfig.placeholder}
                                  options={form.config.elementConfig.options}
                                  change={this.handleInput(form.id)}/>
                })}
                <Button action={'Success'} clicked={this.submitOrder}>
                    Submit
                </Button>

            </div>
        );
    }


}

export default ContactData;