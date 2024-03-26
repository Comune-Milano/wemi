/** @format */

import {
  TCB_PREV_LIGHT,
  TCB_CONFIG_001,
  TCB_CONFIG_002,
  TCB_CONFIG_003,
  TCB_CONFIG_004,
  TCB_CONFIG_005,
  TCB_CONFIG_006,
  TCB_CONFIG_008,
  TCB_DISP_CONFIG,
  TCB_REQUIRED,
  ADD_CLIENT_ERROR,
  TCB_ADD_PARAMETER_MENU_NAVIGAZIONE
} from 'types/actions';

const initialState = {
  loaded: false,
  // menuNavigazione: {unsaved:false,tabChange:false},
  preventivoLightTCB: {
    modalitaAssunzione: '',
    orario: { id: -1, value: '' },
    contract: { id: -1, value: '' },
    modalitaAssunzione: '',
    nuova: true
  },
  config001: {
    benFlag: "0",
    numeroPersone: 0,
    casaFlag: "0",
    orario: { id: 0, value: '' },
  },
  config002: {
    pgBen: "0",
  },

  config005: {},

  requiredTabs: {
  },

  config003: undefined,

  config006: {
  },

  config008: {
    datiAnagrafici: {
      sessoUtente: { id: 0, value: 'Maschio' },
    },
    datiSede: {

    }
  },
  configDisponibilita: {
    stepper: {
      id: 1,
      required: true,
      active: true,
    }
  },
}

export default function tcbReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TCB_REQUIRED:
      return { ...state, requiredTabs: action.requiredTabs, loaded: true };
    case TCB_CONFIG_001:
      return { ...state, ...action.tcbConfig, loaded: true };
    case TCB_CONFIG_002:
      return { ...state, config002: action.tcbConfig, loaded: true };
    case TCB_CONFIG_003:
      return { ...state, ...action.tcbConfig, loaded: true };
    case TCB_CONFIG_004:
      return { ...state, config004: action.tcbConfig, loaded: true };
    case TCB_CONFIG_005:
      return { ...state, config005: action.tcbConfig, loaded: true };
    case TCB_CONFIG_006:
      return { ...state, config006: action.tcbConfig, loaded: true };
    case TCB_CONFIG_008:
      return { ...state, config008: { ...action.tcbConfig }, loaded: true };
    case TCB_PREV_LIGHT:
      return { ...state, ...action.prevLight, loaded: true };
    case TCB_DISP_CONFIG:
      return { ...state, configDisponibilita: action.elemento };
    case TCB_ADD_PARAMETER_MENU_NAVIGAZIONE:
      return { ...state, menuNavigazione: action.elemento };
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}



