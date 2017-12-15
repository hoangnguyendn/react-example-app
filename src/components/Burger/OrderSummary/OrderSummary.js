import React from 'react'
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return <li><span>{ingredient}: {props.ingredients[ingredient]} </span></li>
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Burger</p>
            <ul>
                {ingredients}
            </ul>
        </Aux>
    );
};

export default orderSummary;