import { actionTypes } from './action';

export const initCart = {
    cartItems: [],
    amount: 0,
    cartTotal: 0,
    discount: 0,
    deliveryMethod: '',
    cityName: '',
    department: '',
    userInfo: {}
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_CART_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.UPDATE_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.GET_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.VOUCHER_DISCOUNT_SUCCESS:
            return {
                ...state,
                ...{ discount: action.payload.discount },
            };
        case actionTypes.ADD_DELIVERY_SUCCESS:
            return {
                ...state,
                ...{deliveryMethod: action.payload.deliveryMethod },
                ...{cityName: action.payload.cityName },
                ...{department: action.payload.department },
            };
        case actionTypes.USER_INFO_SAVE_SUCCESS:
            return {
                ...state,
                ...{userInfo: action.payload.userInfo },
            };
        default:
            return state;
    }
}

export default reducer;
