import React, {Component} from 'react'
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(ingredient => {
                return <li key={ingredient}><span>{ingredient}: {this.props.ingredients[ingredient]} </span></li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Burger</p>
                <ul>
                    {ingredients}
                </ul>
                <p>Total Price: <span><b>{this.props.totalPrice.toFixed(2)} $</b></span></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.continue} action={'Success'}>
                    CONTINUE
                </Button>
                <Button clicked={this.props.cancel} action={'Danger'}>
                    CANCEL
                </Button>
            </Aux>
        );
    };

};

export default OrderSummary;