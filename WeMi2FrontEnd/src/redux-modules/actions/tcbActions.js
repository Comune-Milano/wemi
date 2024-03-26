import {
    TCB_DISP_CONFIG,
    TCB_ADD_PARAMETER_MENU_NAVIGAZIONE
} from 'types/actions';

export const TCBDispConfig = elemento => ({
    type: TCB_DISP_CONFIG,
    elemento
  });

  export const TCBMenuNavigazione = elemento => ({
    type: TCB_ADD_PARAMETER_MENU_NAVIGAZIONE,
    elemento
  });

