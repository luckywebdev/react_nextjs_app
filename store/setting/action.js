export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    CHANGE_LANGUAGE_SUCCESS: 'CHANGE_LANGUAGE_SUCCESS',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY, currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}
export function changeLanguage(lang) {
    return { type: actionTypes.CHANGE_LANGUAGE, lang };
}

export function changeLanguageSuccess(lang) {
    return { type: actionTypes.CHANGE_LANGUAGE_SUCCESS, lang };
}
