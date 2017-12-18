import React from 'react';
import Element from './Element/Element';
import classCSS from './BuildControl.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControl = (props) => {
    return (
        <div className={classCSS.BuildControl}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <Element
                    add={() => props.ingredientAdded(control.type)}
                    remove={() => props.ingredientRemoved(control.type)}
                    disable={props.disable[control.type]}
                    key={control.label}
                    label={control.label}
                />
            })}
            <button
                disabled={!props.purchaseable}
                className={classCSS.OrderButton}
                onClick={props.order}>
                ORDER NOW
            </button>
        </div>
    );
};


export default buildControl;