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
    onSetIngredient,
    addIngredient,
    removeIngredient
} from '../../store/actions/burger';

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        order: false,
        loading: false,
    };

    componentDidMount() {
        // axios.get('/ingredients.json').then(res => {
        //     //console.log(res.data);
        //     return this.props.onLoad(res.data);
        // });
        this.props.onSetIngredient();
    }

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
        //console.log(ingredient);
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //console.log(sum);
        return sum > 0;

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
        //console.log(this.props.ingredients);
        //this.updatePurchaseState(this.props.ingredients);


    };

    removeIngredients = (type) => {
        // Without Redux

        // const oldCount = this.state.ingredients[type];
        // if (oldCount > 0) {
        //     const updatedCount = oldCount - 1;
        //     const updatedIngridients = {
        //         ...this.state.ingredients
        //     };
        //     updatedIngridients[type] = updatedCount;
        //     const priceRemove = INGREDIENT_PRICES[type];
        //     const oldPrice = this.state.totalPrice;
        //     const newPrice = oldPrice - priceRemove;
        //     this.setState({
        //         totalPrice: newPrice,
        //         ingredients: updatedIngridients
        //     });
        //     this.updatePurchaseState(updatedIngridients);
        // }
        // // console.log("REMOVEEEE")

        // With Redux


        this.props.onRemoveIngredient(type);
        //this.updatePurchaseState(this.props.ingredients);
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
        // Without Redux
        //this.props.history.push('checkout', {ingredients: this.state.ingredients, totalPrice: this.state.totalPrice});

        // With Redux
        this.props.history.push('checkout');
    };

    // componentWillUnmount() {
    //     this.props.onUnLoad();
    // }

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

        if (this.props.loading) {
            orderSummary = <Spinnder/>
        }

        if (!this.props.error) {
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
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        order={this.order}
                        totalPrice={this.props.totalPrice}
                        ingredientAdded={this.addIngredients}
                        ingredientRemoved={this.removeIngredients}
                        disable={disableInfo}/>
                </Aux>
            );
        }
        else
            return <Modal show={this.props.error}
                          modalClosed={this.modalClosed}>
                        {this.props.error}
                    </Modal>
    }
}

const mapStateToProps = state => {
    return {
        ...state.burger
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        onSetIngredient: () =>
            dispatch(onSetIngredient()),
        // onUnLoad: (payload) =>
        //     dispatch({type: ON_UNLOAD}),
        onAddIngredient: (type) =>
            dispatch(addIngredient(type)),
        onRemoveIngredient: (type) =>
            dispatch(removeIngredient(type)),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
