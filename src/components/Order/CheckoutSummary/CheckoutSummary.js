import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classCSS from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classCSS.CheckoutSummary}>
            <h1 style={{textAlign: 'center'}}>McDonald's™</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients}>
                </Burger>
            </div>
            <Button action="Success"
                    clicked={props.checkoutContinue}>
                CONTINUE
            </Button>
            <Button action="Danger"
                    clicked={props.goBackBuilder}>
                CANCEL
            </Button>
        </div>
    );
};


export default checkoutSummary;