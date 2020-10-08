import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '$',
        text: 'USD',
    },
    lang: "en"
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY_SUCCESS:
            return {
                ...state,
                ...{ currency: action.currency },
            };
        case actionTypes.CHANGE_LANGUAGE_SUCCESS:
            return {
                ...state,
                ...{ lang: action.lang },
            };
        default:
            return state;
    }
}

export default reducer;
