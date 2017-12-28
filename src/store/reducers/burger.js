import {
    ON_LOAD,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from '../actionTypes';
const initialState = {
    price:
        null
    ,
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
};


const burger = (state = initialState, action) => {
    switch (action.type) {
        case ON_LOAD: {
            let price = {...state.price};
            price = action.payload;

            return {
                ...state,
                price: action.payload[0]
            };
        }
        case ADD_INGREDIENT: {
            const oldCount = state.ingredients[action.payload.type];
            const updatedCount = oldCount + 1;
            const updatedIngridients = {
                ...state.ingredients
            };
            updatedIngridients[action.payload.type] = updatedCount;
            const priceAddition = state.price[action.payload.type];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            return {
                ...state,
                ingredients: updatedIngridients,
                totalPrice: newPrice
            };
        }
        case REMOVE_INGREDIENT: {
            const oldCount = state.ingredients[action.payload.type];
            if (oldCount > 0) {
                const updatedCount = oldCount - 1;
                const updatedIngridients = {
                    ...state.ingredients
                };
                updatedIngridients[action.payload.type] = updatedCount;
                const priceRemove = state.price[action.payload.type];
                const oldPrice = state.totalPrice;
                const newPrice = oldPrice - priceRemove;
                return {
                    ...state,
                    ingredients: updatedIngridients,
                    totalPrice: newPrice
                };
            }
            return state;
        }
        default:
            return state
    }
};

export default burger;