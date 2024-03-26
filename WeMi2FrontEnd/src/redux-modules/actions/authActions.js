/** @format */

import {
  FETCH_CURRENT_USER,
  CREATE_LOGIN_REQUEST,
  CREATE_LOGIN_FAILURE,
  USER_LOGGED_IN,
  CREATE_LOGOUT_REQUEST,
  USER_LOGGED_OUT,
  GRAPHQL_REQUEST,
  OVERLAY_SPINNER,
  ENTE_ADD,
  CURRENT_REQUEST,
  FILTER_ADD,
  FILTER_DATA_ADD,
  ENTE_REMOVE,
  TCB_PREV_LIGHT,
  TCB_CONFIG_001,
  TCB_CONFIG_002,
  TCB_CONFIG_004,
  TCB_CONFIG_005,
  TCB_CONFIG_006,
  TCB_CONFIG_003,
  TCB_CONFIG_008,
  TCB_ICL_001,
  TCB_ICL_006,
  TCB_ICL_STEPPER,
  FILTER_INDEX_ADD,
  FILTER_REMOVE,
  RESET_FIELD,
  RESET_FIELDS,
  CAT_HOMEPAGE,
  TCB_STEPPER,
  TCB_REQUIRED,
  TCB_STEPPER_2,
  TCB_STEPPER_2_INFO,
  ENT_ERI_ACCETTAZIONE,
  CATEGORIA_SELEZIONATA,
  DATI_FATTURAZIONE,
  SCROLL_INTO_VIEW,
} from 'types/actions';

// export const setPrintMode = print =>({
//   type: PRINT_ENABLED,
//   print
// })
export const openLoginModal = value =>({
  type: 'OPEN_MODAL_LOGIN',
  value,
});

export const overlaySpinner = value =>({
  type: OVERLAY_SPINNER,
  value,
});

export const createLoginRequest = user => ({
  type: CREATE_LOGIN_REQUEST,
  user,
});

export const createLoginFailure = errors => ({
  type: CREATE_LOGIN_FAILURE,
  errors,
});

export const scrollIntoView = flag => ({
  type: SCROLL_INTO_VIEW,
  flag,
});

export const userLoggedIn = datiLogin => ({
  type: USER_LOGGED_IN,
  datiLogin,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const createLogoutRequest = user => ({
  type: CREATE_LOGOUT_REQUEST,
  user,
});

export const fetchCurrentUser = user => ({
  type: FETCH_CURRENT_USER,
  user,
});

export const AddEnte = ente => ({
  type: ENTE_ADD,
  ente,
});

export const RemoveEnte = ente => ({
  type: ENTE_REMOVE,
  ente,
});

export const ResetEnti = () => ({
  type: 'RESET_ENTI',
});

export const AddFilter = filter => ({
  type: FILTER_ADD,
  filter,
});

export const AddFilterData = filterData => ({
  type: FILTER_DATA_ADD,
  filterData,
});

export const EntEriRichiesta = entEriRichiesta => ({
  type: ENT_ERI_ACCETTAZIONE,
  entEriRichiesta,
});

export const CategoriaSelezionata = CategoriaSelezionata => ({
  type: CATEGORIA_SELEZIONATA,
  CategoriaSelezionata,
});

export const CategoriaHomePage = cat => ({
  type: CAT_HOMEPAGE,
  cat,
});

export const PreventivoLightTCB = prevLight => ({
  type: TCB_PREV_LIGHT,
  prevLight,
});

export const TCBRequired = requiredTabs => ({
  type: TCB_REQUIRED,
  requiredTabs,
});

export const TCBCandidatura001 = candidaturaConfig => ({
  type: TCB_ICL_001,
  candidaturaConfig,
});

export const TCBCandidatura006 = candidaturaConfig => ({
  type: TCB_ICL_006,
  candidaturaConfig,
});

export const TCBConfig001 = tcbConfig => ({
  type: TCB_CONFIG_001,
  tcbConfig,
});

export const TCBConfig002 = tcbConfig => ({
  type: TCB_CONFIG_002,
  tcbConfig,
});

export const TCBConfig003 = tcbConfig => ({
  type: TCB_CONFIG_003,
  tcbConfig,
});

export const TCBConfig004 = tcbConfig => ({
  type: TCB_CONFIG_004,
  tcbConfig,
});

export const TCBConfig005 = tcbConfig => ({
  type: TCB_CONFIG_005,
  tcbConfig,
});

export const TCBConfig006 = tcbConfig => ({
  type: TCB_CONFIG_006,
  tcbConfig,
});

export const TCBConfig008 = tcbConfig => ({
  type: TCB_CONFIG_008,
  tcbConfig,
});

export const TCBStepper = stepperTCB => ({
  type: TCB_STEPPER,
  stepperTCB,
});

export const TCBSecondStepper = stepperTCB => ({
  type: TCB_STEPPER_2,
  stepperTCB,
});

export const TCBSecondStepperInfo = stepperTCBInfo => ({
  type: TCB_STEPPER_2_INFO,
  stepperTCBInfo,
});

export const DatiFatturazione = datiFatturazione => ({
  type: DATI_FATTURAZIONE,
  datiFatturazione,
});

export const graphqlRequest = graphql => ({
  type: GRAPHQL_REQUEST,
  graphql: graphql[1],
  id: graphql[0],
});


// ACTION CHE SPARA REQUEST_LOG

// export const comuneMilanoAPIRequest = (requestJSON, authToken) => ({
//   type: COMUNE_MILANO_REST_REQUEST,
//   requestJSON,
//   authToken: authToken,
// });

// export const comuneMilanoSoapAPIRequest = (requestXML, authToken) => ({
//   type: COMUNE_MILANO_SOAP_REQUEST,
//   requestXML: requestXML,
//   authToken: authToken,
// });

export const currentRequest = element => ({
  type: CURRENT_REQUEST,
  element,
});

export const filterIndexAdd = element => ({
  type: FILTER_INDEX_ADD,
  element,
});

export const resetField = element => ({
  type: RESET_FIELD,
  element,
});

export const resetFields = fields => ({
  type: RESET_FIELDS,
  fields,
});


export const removeFilters = element => ({
  type: FILTER_REMOVE,
  element,
});
