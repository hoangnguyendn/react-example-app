import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_END,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_ONLOAD
} from './actionTypes'
import axios from '../../axios-orders';

export const purchaseBurgerOnload = () => {
    return {
        type: PURCHASE_BURGER_ONLOAD
    }
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        payload: {
            error: error
        }
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
};

export const purchaseBurgerEnd = () => {
    return {
        type: PURCHASE_BURGER_END
    }
};


export const sendOrder = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('orders.json', order)
            .then(res => {
                //console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data.name, order))
                dispatch(purchaseBurgerEnd());
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
                dispatch(purchaseBurgerEnd());
            })
    }
};

