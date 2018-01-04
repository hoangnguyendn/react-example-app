import {
    SET_INGREDIENT,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    FETCH_INGREDIENT_FAIL
} from './actionTypes';
import axios from '../../axios-orders';

export const setIngredient = (payload) => {
    return {
        type: SET_INGREDIENT,
        payload: {
            price: payload
        },
    }
};

export const fetchIngredientFail = (error) => {
    return {
        type: FETCH_INGREDIENT_FAIL,
        payload: {
            error: error
        }
    }
};

export const onSetIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(res => {
            dispatch(setIngredient(res.data))
        }).catch(error => {
            dispatch(fetchIngredientFail('Something went wrong!!!'))
        });
    }
};

export const addIngredient = (type) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            type: type
        }
    }
};

export const removeIngredient = (payload) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: payload
    }
};