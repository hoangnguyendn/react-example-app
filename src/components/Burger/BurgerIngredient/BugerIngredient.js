import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classCSS from './BugerIngredient.css'

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classCSS.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classCSS.BreadTop}>
                        <div className={classCSS.Seeds1}></div>
                        <div className={classCSS.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={classCSS.Meat}></div>;
                break;
            case ( 'cheese' ):
                ingredient = <div className={classCSS.Cheese}></div>;
                break;
            case ( 'bacon' ):
                ingredient = <div className={classCSS.Bacon}></div>;
                break;
            case ( 'salad' ):
                ingredient = <div className={classCSS.Salad}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    };
};


BurgerIngredient.propTypes = {
    type : PropTypes.string.isRequired
};

export default BurgerIngredient;