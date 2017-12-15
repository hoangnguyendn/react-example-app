import React from 'react';
import BurgerIngredient from './BurgerIngredient/BugerIngredient';
import classCSS from './Burger.css';

const burger = (props) => {
    let arrayIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // console.log(igKey);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (arrayIngredients.length === 0) {
        arrayIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classCSS.Burger}>
            <BurgerIngredient type="bread-top"/>
                {arrayIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>

    );
};

export default burger;