export const actionTypes = {
    GET_CART: 'GET_CART',
    GET_CART_SUCCESS: 'GET_CART_SUCCESS',
    GET_CART_ERROR: 'GET_CART_ERROR',

    GET_CART_TOTAL_QUANTITY: 'GET_CART_TOTAL_QUANTITY',
    GET_CART_TOTAL_QUANTITY_SUCCESS: 'GET_CART_TOTAL_QUANTITY_SUCCESS',

    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',

    CLEAR_CART: 'CLEAR_CART',
    CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
    CLEAR_CART_ERROR: 'CLEAR_CART_ERROR',

    INCREASE_QTY: 'INCREASE_QTY',
    INCREASE_QTY_SUCCESS: 'INCREASE_QTY_SUCCESS',
    INCREASE_QTY_ERROR: 'INCREASE_QTY_ERROR',

    DECREASE_QTY: 'DECREASE_QTY',
    UPDATE_CART: 'UPDATE_CART',

    UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
    UPDATE_CART_ERROR: 'UPDATE_CART_ERROR',

    VOUCHER_DISCOUNT: 'VOUCHER_DISCOUNT',
    VOUCHER_DISCOUNT_SUCCESS: 'VOUCHER_DISCOUNT_SUCCESS',

    ADD_DELIVERY: 'ADD_DELIVERY',
    ADD_DELIVERY_SUCCESS: 'ADD_DELIVERY_SUCCESS',

    USER_INFO_SAVE: 'USER_INFO_SAVE',
    USER_INFO_SAVE_SUCCESS: 'USER_INFO_SAVE_SUCCESS'
};

export function getCart() {
    return { type: actionTypes.GET_CART };
}

export function getCartSuccess() {
    return {
        type: actionTypes.GET_CART_SUCCESS,
    };
}

export function getCartError(error) {
    return {
        type: actionTypes.GET_CART_ERROR,
        error,
    };
}

export function addItem(product) {
    return { type: actionTypes.ADD_ITEM, product };
}

export function removeItem(product) {
    return { type: actionTypes.REMOVE_ITEM, product };
}

export function increaseItemQty(product) {
    return { type: actionTypes.INCREASE_QTY, product };
}

export function decreaseItemQty(product) {
    return { type: actionTypes.DECREASE_QTY, product };
}

export function updateCartSuccess(payload) {
    return {
        type: actionTypes.UPDATE_CART_SUCCESS,
        payload,
    };
}

export function updateCartError(payload) {
    return {
        type: actionTypes.UPDATE_CART_ERROR,
        payload,
    };
}

export function voucherDiscount(payload) {
    return {
        type: actionTypes.VOUCHER_DISCOUNT,
        payload,
    };
}

export function voucherDiscountSuccess(action) {
    return {
        type: actionTypes.VOUCHER_DISCOUNT_SUCCESS,
        payload: action.payload,
    };
}

export function addDelivery(payload) {
    return {
        type: actionTypes.ADD_DELIVERY,
        payload,
    };
}

export function addDeliverySuccess(action) {
    return {
        type: actionTypes.ADD_DELIVERY_SUCCESS,
        payload: action.payload,
    };
}

export function userInfoSave(payload) {
    return {
        type: actionTypes.USER_INFO_SAVE,
        payload,
    };
}

export function userInfoSaveSuccess(action) {

    return {
        type: actionTypes.USER_INFO_SAVE_SUCCESS,
        payload: action.payload,
    };
}

