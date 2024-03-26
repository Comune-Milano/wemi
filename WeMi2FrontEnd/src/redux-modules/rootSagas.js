/** @format */

import { takeLatest, takeEvery } from 'redux-saga/effects';
import { CREATE_LOGIN_REQUEST, CREATE_LOGOUT_REQUEST, GRAPHQL_REQUEST, REQUEST_LOG } from 'types/actions';
import { loginSaga, logoutSaga } from 'redux-modules/sagas/authSagas';
import { functionGraphQL } from 'redux-modules/sagas/graphqlSagas';

export default function* rootSaga() {
  yield takeLatest(CREATE_LOGIN_REQUEST, loginSaga);
  yield takeLatest(CREATE_LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(GRAPHQL_REQUEST, functionGraphQL);
}
