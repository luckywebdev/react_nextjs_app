import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, changeCurrencySuccess, changeLanguageSuccess } from './action';

function* changeCurrencySaga({ currency }) {
    try {
        yield put(changeCurrencySuccess(currency));
    } catch (err) {
        console.error(err);
    }
}
function* changeLanguageSaga({ lang }) {
    try {
        yield put(changeLanguageSuccess(lang));
    } catch (err) {
        console.error(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.CHANGE_CURRENCY, changeCurrencySaga)]);
    yield all([takeEvery(actionTypes.CHANGE_LANGUAGE, changeLanguageSaga)]);
}
