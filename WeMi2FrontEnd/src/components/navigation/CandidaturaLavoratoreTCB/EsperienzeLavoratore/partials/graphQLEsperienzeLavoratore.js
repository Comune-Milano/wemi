
export const estraiServiziTCB = [
  '',
  `query tipoServizioTcbAll {
    tipoServizioTcbAll {
      ty_dominio_tcb
      tl_valore_testuale
      cd_dominio_tcb
      pg_visualizzazione
    }
  }`,
  'tipoServizioTcbAll',
];

export const inizializzaEsperienza = [
  '',
  `mutation inizializzaModificaEsperienzeLavoratore ($input: esperienzaInput!) { 
    inizializzaModificaEsperienzeLavoratore(input: $input)
  }`,
  '',
];


export const estraiEsperienzeLavoratore = [
  '',
  `
    query estraiEsperienzeLavoratore ($idUtenteLav: Int!) {
      estraiEsperienzeLavoratore(idUtenteLav: $idUtenteLav) {
        idRichiesta
        serviziPrestati
        inizioPeriodo
        finePeriodo
        descrizioneEsp
        nomeServizioAltro
        type
        attributi {
          cd_attributo
          cd_val_attributo
          tx_val
        }
      }
    }
  `,
  'estraiEsperienzeLavoratore',
];

export const rimuoviFamiglia = [
  '',
  `
  mutation rimuoviEsperienzeLavoratore($idRichiesta: Int!) {
      rimuoviEsperienzeLavoratore(idRichiesta: $idRichiesta)
  }`,
  'rimuoviEsperienzeLavoratore',
];

export const inserisciModificaAttributoUtente = [
  '',
  `mutation InserisciModificaAttributoUtente($input: AttributoUtenteInput!){
    InserisciModificaAttributoUtente(
    input: $input
    )
  }`,
  'InserisciModificaAttributoUtente',
];

export const estraiValAttributiUtente = [
  '',
  `query EstraiValAttributiUtente($idUtente: Int!, $arrayCdAttr: [Int]) {
    EstraiValAttributiUtente(
      idUtente: $idUtente,
      arrayCdAttr: $arrayCdAttr
    ) {
      txVal
    }
  }`,
  'EstraiValAttributiUtente',
];