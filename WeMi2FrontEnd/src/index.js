/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import it from 'react-intl/locale-data/it';
import setAuthorizationHeader from 'utils/setAuthorizationHeader';
import 'theme/bootstrap-reboot.css';
import configureStore from 'redux-modules/store';
import { fetchCurrentUser } from 'redux-modules/actions/authActions';
import * as serviceWorker from 'serviceWorker';
import App from 'components/app';
import { APP_NAME } from 'types/general';
import getFromLocalStorage from 'utils/cache/getFromLocalStorage';
import 'dotenv/config';

const store = configureStore();

addLocaleData([...it]);

if (localStorage[APP_NAME]) {
  const user = getFromLocalStorage(APP_NAME);
  setAuthorizationHeader(user.token);
  store.dispatch(fetchCurrentUser(user));
} else {
  store.dispatch(fetchCurrentUser({}));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
