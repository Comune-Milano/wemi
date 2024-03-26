/** @format */

import { combineReducers } from 'redux';
import goi003Reducer from 'redux-modules/reducers/goi003Reducer';
import openModalInserimentoReducer from 'redux-modules/reducers/openModalInserimentoReducer';
import entEriReducer from 'redux-modules/reducers/entEriReducer';
import localeReducer from 'redux-modules/reducers/localeReducer';
import trackingReducer from 'redux-modules/reducers/trackingReducer';
import routingReducer from 'redux-modules/reducers/routingReducer';
import graphqlReducer from 'redux-modules/reducers/graphqlReducer';
import userReducer from 'redux-modules/reducers/userReducer';
import tcbReducer from 'redux-modules/reducers/tcbReducer';
import stepperTCB from 'redux-modules/reducers/stepperReducer';
import datiLoginReducer from "redux-modules/reducers/datiLoginReducer";
import errorReducer from 'redux-modules/reducers/errorReducer';
import purchaseReducer from 'redux-modules/reducers/purchaseReducer';
import cartReducer from 'redux-modules/reducers/cartReducer';
import searchReducer from 'redux-modules/reducers/searchReducer';
import filterReducer from 'redux-modules/reducers/filterReducer'
import simulatoreReducer from 'redux-modules/reducers/simulatoreReducer';
import richiestaReducer from 'redux-modules/reducers/richiestaReducer';
import categoriaReducer from 'redux-modules/reducers/categoryReducer';
import fatturazioneReducer from 'redux-modules/reducers/datiFatturazione';
import candidaturaReducer from 'redux-modules/reducers/tcbCandidaturaReducer';
import goi005Reducer from 'redux-modules/reducers/goi005Reducer';
import forwardEntiReducer from 'redux-modules/reducers/forwardEntiReducer';
const rootReducer = combineReducers({
  goi005: goi005Reducer,
  goi003: goi003Reducer,
  openModalInserimento: openModalInserimentoReducer,
  entEri: entEriReducer,
  error: errorReducer,
  tcbSim: simulatoreReducer,
  user: userReducer,
  requestTCB: tcbReducer,
  datiLogin: datiLoginReducer,
  graphql: graphqlReducer,
  locale: localeReducer,
  tracking: trackingReducer,
  routing: routingReducer,
  purchase: purchaseReducer,
  cart: cartReducer,
  search: searchReducer,
  stepperTCB,
  filter: filterReducer,
  entEriRichiesta: richiestaReducer,
  categoriaRichiesta: categoriaReducer,
  datiFattura: fatturazioneReducer,
  candidaturaTCB: candidaturaReducer,
  forwardEnti: forwardEntiReducer,
});

export default rootReducer;
