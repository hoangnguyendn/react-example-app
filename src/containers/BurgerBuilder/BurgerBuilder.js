import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinnder from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {
    ON_LOAD,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from '../../store/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 1,
    cheese: 0.5,
    meat: 0.7,
};


class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // totalPrice: 0,
        purchaseable: false,
        order: false,
        loading: false,
        orderSuccess: false
    };

    componentWillMount() {
        this.props.onLoad(Promise.all([
            axios.get('/ingredients.json').then(res => {
                // console.log(res);
                // price['salad'] = res.data.salad;
                // price['bacon'] = res.data.bacon;
                // price['cheese'] = res.data.cheese;
                // price['meat'] = res.data.meat;
                //console.log(res.data)
                return res.data;
            })
        ]));
        //console.log(this.props);

    }

    componentDidMount() {
        console.log(this.props.price);
    }
    //     axios.get('/ingredients.json').then(res => {
    //         // console.log(res);
    //         INGREDIENT_PRICES['salad'] = res.data.salad;
    //         INGREDIENT_PRICES['bacon'] = res.data.bacon;
    //         INGREDIENT_PRICES['cheese'] = res.data.cheese;
    //         INGREDIENT_PRICES['meat'] = res.data.meat;
    //     });
    //     console.log(this.props);
    // }

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
        // Without Redux {

        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngridients = {
        //     ...this.state.ingredients
        // };
        // updatedIngridients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({
        //     totalPrice: newPrice,
        //     ingredients: updatedIngridients
        // });
        // // console.log("ADDDDDDD")
        // this.updatePurchaseState(updatedIngridients);

        // }


        // With Redux

        this.props.onAddIngredient(type);


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
        this.props.history.push('checkout', {ingredients: this.state.ingredients, totalPrice: this.state.totalPrice});
    };


    render() {
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = (
            <OrderSummary
                totalPrice={this.props.totalPrice}
                ingredients={this.props.ingredients}
                continue={this.continueOrder}
                cancel={this.modalClosed}>
            </OrderSummary>
        );

        if (this.state.loading) {
            orderSummary = <Spinnder/>
        }

        return (
            <Aux>
                <Modal show={this.state.order}
                       modalClosed={this.modalClosed}>
                    {orderSummary}
                </Modal>
                <Burger
                    ingredients={this.props.ingredients}>
                </Burger>
                <BuildControl
                    purchaseable={this.state.purchaseable}
                    order={this.order}
                    totalPrice={this.props.totalPrice}
                    ingredientAdded={this.addIngredients}
                    ingredientRemoved={this.removeIngredients}
                    disable={disableInfo}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.burger
    }
};

const mapDispatchtoProps = dispatch => {
    return ({
        onLoad: (payload) =>
            dispatch({type: ON_LOAD, payload: payload}),
        onAddIngredient: (type, price) =>
            dispatch({
                type: ADD_INGREDIENT, payload: {
                    type: type
                }
            }),
        onRemoveIngredient: (type, price) =>
            dispatch({
                type: REMOVE_INGREDIENT, payload: {
                    type: type
                }
            }),

    });
};

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
