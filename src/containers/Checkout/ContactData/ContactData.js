import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classCSS from './ContactData.css';
import axios from '../../../axios-orders';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Country',
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
                value: ''
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address',
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
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
                value: 'Plane'
            }
        },
        submit: {
            disabled: true
        },
        totalPrice: null,
        ingredients: null,
        loading: false,
        success: false
    };

    componentDidMount() {
        //console.log(this.props);
        if (typeof this.props.ingredients !== "undefined") {
            this.setState({
                ingredients: this.props.ingredients,
                totalPrice: this.props.totalPrice
            })
        }
    }

    checkValidation = (values, rules) => {
        let isValid = false;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = values.trim() !== '';
        }
        return isValid;
    };

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
        orderForm[type].valid = this.checkValidation(event.target.value, orderForm[type].validation);
        orderForm[type].focus = true;
        //console.log(orderForm[type]);
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
                this.setState({
                    loading: false,
                });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 3000)
            })
            .catch(err => {
                this.setState({
                    loading: false
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
                <Modal show={this.state.success}>
                    <b>Order Successfully</b>
                </Modal>
                <h4>Please fill out this form</h4>
                {formElementArray.map(form => {
                    return <Input key={form.id}
                                  inputtype={form.config.elementType}
                                  type={form.config.elementConfig.type}
                                  placeholder={form.config.elementConfig.placeholder}
                                  options={form.config.elementConfig.options}
                                  change={this.handleInput(form.id)}
                                  shouldValidate={form.config.validation}
                                  invalid={!form.config.valid}
                                  touched={form.config.focus}/>
                })}
                <Button disabled={this.state.submit.disabled} action={'Success'} clicked={this.submitOrder}>
                    Submit
                </Button>

            </div>
        );
    }


}

export default WithErrorHandler(ContactData, axios);