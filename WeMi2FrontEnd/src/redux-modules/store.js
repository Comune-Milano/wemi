/** @format */

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';
import rootReducer from './rootReducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export default function configureState(preloadState) {
  const store = createStore(
    rootReducer,
    preloadState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
