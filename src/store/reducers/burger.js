import {
    SET_INGREDIENT,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    FETCH_INGREDIENT_FAIL,
} from '../actions/actionTypes';

const initialState = {
    price: null,
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0,
    error: false
};


const burger = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT: {
            return {
                ...state,
                price: action.payload.price,
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                totalPrice: 0
            };
        }
        case FETCH_INGREDIENT_FAIL: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case ADD_INGREDIENT: {
            // const oldCount = state.ingredients[action.payload.type];
            // const updatedCount = oldCount + 1;
            // const updatedIngridients = {
            //     ...state.ingredients
            // };
            // updatedIngridients[action.payload.type] = updatedCount;
            // const priceAddition = state.price[action.payload.type];
            // const oldPrice = state.totalPrice;
            // const newPrice = oldPrice + priceAddition;
            // return {
            //     ...state,
            //     ingredients: updatedIngridients,
            //     totalPrice: newPrice
            // };
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.type]: state.ingredients[action.payload.type] + 1
                },
                totalPrice: state.totalPrice + state.price[action.payload.type]
            }
        }
        case REMOVE_INGREDIENT: {
            // const oldCount = state.ingredients[action.payload.type];
            // if (oldCount > 0) {
            //     const updatedCount = oldCount - 1;
            //     const updatedIngridients = {
            //         ...state.ingredients
            //     };
            //     updatedIngridients[action.payload.type] = updatedCount;
            //     const priceRemove = state.price[action.payload.type];
            //     const oldPrice = state.totalPrice;
            //     const newPrice = oldPrice - priceRemove;
            //     return {
            //         ...state,
            //         ingredients: updatedIngridients,
            //         totalPrice: newPrice
            //     };
            // }
            // return state;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.type]: state.ingredients[action.payload.type] - 1
                },
                totalPrice: state.totalPrice - state.price[action.payload.type]
            }
        }
        default:
            return state
    }
};

export default burger;