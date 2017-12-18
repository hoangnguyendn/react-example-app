import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 1,
    cheese: 0.5,
    meat: 0.7
};


class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        order: false
    };

    updatePurchaseState = (ingredient) => {
        // let total = 0;
        // for (let property in ingredient) {
        //     total += ingredient[property]
        // }
        // if (total >= 0) {
        //     this.setState({
        //         purchaseable: false
        //     })
        // }else {
        //     this.setState({
        //         purchaseable: true
        //     })
        // }

        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchaseable: sum > 0});

    };

    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingredients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngridients
        });
        // console.log("ADDDDDDD")
        this.updatePurchaseState(updatedIngridients);
    };

    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngridients = {
                ...this.state.ingredients
            };
            updatedIngridients[type] = updatedCount;
            const priceRemove = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceRemove;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngridients
            });
            this.updatePurchaseState(updatedIngridients);
        }
        // console.log("REMOVEEEE")
    };

    order = () => {
        this.setState({
            order: true
        });
    };

    modalClosed = () => {
        this.setState({
            order: false
        })
    };

    continueOrder = () => {
        alert ('Order success');
    };


    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.order}
                       modalClosed={this.modalClosed}>
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        continue={this.continueOrder}
                        cancel={this.modalClosed}>

                    </OrderSummary>
                </Modal>
                <Burger
                    ingredients={this.state.ingredients}>
                </Burger>
                <BuildControl
                    purchaseable={this.state.purchaseable}
                    order={this.order}
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredients}
                    ingredientRemoved={this.removeIngredients}
                    disable={disableInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
