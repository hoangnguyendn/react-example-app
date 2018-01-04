import {
    PURCHASE_BURGER_ONLOAD,
    PURCHASE_BURGER_END,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: null,
    loading: false,
    orderSuccess: false
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_BURGER_ONLOAD: {
            return {
                ...state,
                error: null,
                orderSuccess: false
            }
        }
        case PURCHASE_BURGER_START: {
            return {
                ...state,
                loading: true
            }
        }
        case PURCHASE_BURGER_END: {
            return {
                ...state,
                loading: false
            }
        }
        case PURCHASE_BURGER_SUCCESS: {
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId,
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                orderSuccess: true
            }
        }
        case PURCHASE_BURGER_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        default:
            return state
    }
};

export default order;