import { SCHEDA_ENTE_STATE } from 'types/statischedaente';

export const buttonVisibilityEnte = (code) => {
  const buttons = {
    annulla: {
      visibility: true,
    },
    salva: {
      visibility: false,
    },
    riepilogo: {
      visibility: true,
    },
    inoltra: {
      visibility: false,
    },

  };

  if (code === SCHEDA_ENTE_STATE.BOZZA) {
    buttons.salva = {
      visibility: false,
    };
    buttons.inoltra = {
      visibility: false,
    };
  }
  if (code === SCHEDA_ENTE_STATE.ACCREDITATO) {
    buttons.salva = {
      visibility: true,
    };
    buttons.inoltra = {
      visibility: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DISATTIVATA) {
    buttons.salva = {
      visibility: false,
    };
    buttons.inoltra = {
      visibility: false,
    };
  }
  if (code === SCHEDA_ENTE_STATE.IN_COMPILAZIONE) {
    buttons.salva = {
      visibility: true,
    };
    buttons.inoltra = {
      visibility: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.COMPILATA) {
    buttons.salva = {
      visibility: false,
    };
    buttons.inoltra = {
      visibility: false,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DA_CORREGGERE) {
    buttons.salva = {
      visibility: true,
    };
    buttons.inoltra = {
      visibility: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.VALIDATA) {
    buttons.salva = {
      visibility: false,
    };
    buttons.inoltra = {
      visibility: false,
    };
  }
  return buttons;
};

export const buttonsStyleAdmin = (code) => {
  const buttons = {
    annulla: {
      visibility: true,
    },
    salva: {
      visibility: false,
    },
    riepilogo: {
      visibility: true,
    },
    inoltranote: {
      visibility: false,
    },
    valida: {
      visibility: false,
      sizepadding: { xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' },
    },
    disattiva: {
      visibility: false,
      sizepadding: { xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' },
    },
  };

  if (code === SCHEDA_ENTE_STATE.BOZZA) {
    buttons.salva.visibility = true;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = false;

    buttons.disattiva.visibility = true;
  }
  if (code === SCHEDA_ENTE_STATE.ACCREDITATO) {
    buttons.salva.visibility = false;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = false;

    buttons.disattiva.visibility = true;
  }
  if (code === SCHEDA_ENTE_STATE.DISATTIVATA) {
    buttons.salva.visibility = true;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = true;

    buttons.disattiva.visibility = false;
  }
  if (code === SCHEDA_ENTE_STATE.IN_COMPILAZIONE) {
    buttons.salva.visibility = false;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = false;

    buttons.disattiva.visibility = true;
  }
  if (code === SCHEDA_ENTE_STATE.COMPILATA) {
    buttons.salva.visibility = true;

    buttons.inoltranote.visibility = true;

    buttons.valida = {
      visibility: true,
      sizepadding: { xs: '2em 0 0 0', sm: '2em 0 0 2em', md: '2em 0 0 2em' },
    };

    buttons.disattiva = {
      visibility: true,
      sizepadding: { xs: '2em 0 0 0', sm: '2em 0 0 0', md: '2em 0 0 0' },
    };
  }
  if (code === SCHEDA_ENTE_STATE.DA_CORREGGERE) {
    buttons.salva.visibility = false;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = false;

    buttons.disattiva.visibility = true;
  }
  if (code === SCHEDA_ENTE_STATE.VALIDATA) {
    buttons.salva.visibility = true;

    buttons.inoltranote.visibility = false;

    buttons.valida.visibility = false;

    buttons.disattiva.visibility = true;
  }
  return buttons;
};
