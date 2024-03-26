export const RICHIESTA_BOZZA = 0;
export const RICHIESTA_APERTA = 1;
export const RICHIESTA_PAGATA = 2;
export const RICHIESTA_RIFIUTATA = 3;
export const RICHIESTA_SCADUTA = 4;
export const RICHIESTA_INOLTRATA = 10;
export const RICHIESTA_IN_GESTIONE = 6;
export const RICHIESTA_CHIUSA = 7;
export const RICHIESTA_FINALIZZATA = 8;

export const STATO_RICHIESTA_BOZZA = {
  codice: RICHIESTA_BOZZA,
  nome: 'Bozza'
};

export const STATO_RICHIESTA_APERTA = {
  codice: RICHIESTA_INOLTRATA,
  nome: 'Inoltrata'
};

export const STATO_RICHIESTA_ACCETTATA = {
  codice: RICHIESTA_APERTA,
  nome: 'Aperta'
};

export const STATO_RICHIESTA_PAGATA = {
  codice: RICHIESTA_PAGATA,
  nome: 'Pagata'
};

export const STATO_RICHIESTA_RIFIUTATA = {
  codice: RICHIESTA_RIFIUTATA,
  nome: 'Rifiutata'
};

export const STATO_RICHIESTA_SCADUTA = {
  codice: RICHIESTA_SCADUTA,
  nome: 'Scaduta'
};

export const STATO_RICHIESTA_INOLTRATA = {
  codice: RICHIESTA_INOLTRATA,
  nome: 'Inoltrata'
};

export const STATO_RICHIESTA_IN_GESTIONE = {
  codice: RICHIESTA_IN_GESTIONE,
  nome: 'In gestione'
};

export const STATO_RICHIESTA_CHIUSA = {
  codice: RICHIESTA_CHIUSA,
  nome: 'Chiusa'
};

export const STATO_RICHIESTA_FINALIZZATA = {
  codice: RICHIESTA_FINALIZZATA,
  nome: 'Finalizzata'
};
