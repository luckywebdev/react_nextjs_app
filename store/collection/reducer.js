import { actionTypes } from './action';

export const initialState = {
    collections: [],
    categories: [],
    collection: {},
    locations: {},
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                ...{ collections: action.payload },
            };
        case actionTypes.GET_COLLECTION_SUCCESS:
            return {
                ...state,
                ...{ collection: action.payload },
            };
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_GEOLOCATIONS_SUCCESS:
            return {
                ...state,
                ...{ locations: action.payload },
            };
        default:
            return state;
    }
}

export default reducer;
