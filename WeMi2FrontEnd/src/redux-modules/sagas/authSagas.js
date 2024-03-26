/** @format */

import { put, call } from 'redux-saga/effects';
import { userLoggedIn, userLoggedOut, createLoginFailure } from 'redux-modules/actions/authActions';
import setAuthorizationHeader from 'utils/setAuthorizationHeader';
import { APP_NAME } from 'types/general';
import removeLocalStorage from 'utils/cache/removeFromLocalStorage';
import saveToLocalStorage from 'utils/cache/saveToLocalStorage';


export function* loginSaga() {
  try {
    // TODO: Simulating Login process
    const user = {
      email: 'test@test.it',
      token: 'test',
    };
    saveToLocalStorage(APP_NAME, user);
    setAuthorizationHeader(user.token);

    yield put(userLoggedIn(user));
  } catch (err) {
    yield put(createLoginFailure(err.response.data.errors));
  }
}

export function* logoutSaga() {
  removeLocalStorage(APP_NAME);

  setAuthorizationHeader();

  yield put(userLoggedOut());
}



// export function* restRequest(action) {
//   try {
//     const result = yield call(graphqlService.restRequest, action.requestJSON, action.authToken);
//     if (result.errorcode) yield put({ type: COMUNE_MILANO_REST_FAILURE, error: result.errorcode});
//     else yield put({ type: COMUNE_MILANO_REST_SUCCESS, result: result });
//   } catch (error) {
//     yield put({ type: COMUNE_MILANO_REST_FAILURE, error });
//   }
// }

// export function* soapRequest(action) {
//   try {
//     const result = yield call(graphqlService.soapRequest, action.requestXML, action.authToken);
//     if (result.errorcode) yield put({ type: COMUNE_MILANO_SOAP_FAILURE, error: result.errorcode});
//     else yield put({ type: COMUNE_MILANO_SOAP_SUCCESS, result: result });
//   } catch (error) {
//     yield put({ type: COMUNE_MILANO_SOAP_FAILURE, error });
//   }
// }
