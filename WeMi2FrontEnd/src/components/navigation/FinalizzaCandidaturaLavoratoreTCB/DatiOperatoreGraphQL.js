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

const estraiFlagsCandidaturaQueryName = 'estraiFlagsCandidatura';

export const estraiFlagsCandidaturaQuery = [
  '',
  `
    query ${estraiFlagsCandidaturaQueryName}($idUtente: Int!) {
      ${estraiFlagsCandidaturaQueryName}(idUtente: $idUtente) {
        tata,
        colf,
        badante
      }
    }
  `,
  estraiFlagsCandidaturaQueryName,
];

export const rimuoviFamiglia = [
  '',
  `
  mutation rimuoviEsperienzeLavoratore($idRichiesta: Int!) {
      rimuoviEsperienzeLavoratore(idRichiesta: $idRichiesta)
  }`,
  'rimuoviEsperienzeLavoratore',
];

export const inserisciDatiOperatore = [
  '',
  `
  mutation inserisciDatiOperatore ($input: inputDatiOperatore) {
    inserisciDatiOperatore(input: $input )  
  }
  `,
  'inserisciDatiOperatore',
];

export const estraiDocumentiLavoratore = [
  '',
  `query estraiDocumentiLavoratore ($idUtenteLav: Int!)
  {
    estraiDocumentiLavoratore(idUtenteLav: $idUtenteLav){
      documentiLavoratore
    }
  }`,
  'estraiDocumentiLavoratore',
];

export const estraiDatiOperatore = [
  '',
  `query estraiDatiOperatore ($idUtenteLav: Int!, $arrayIdServizi: [Int]!)
  {
    estraiDatiOperatore(
      idUtenteLav: $idUtenteLav,
      arrayIdServizi: $arrayIdServizi
    ) {
      anniEspTata
      anniEspColf
      dtItaliaDal
      anniEspBadante
      statoCandidatura
      vincoliCandidatura
      votoEspTata
      votoEspColf
      votoEspBadante
      iscrittoInps
      iscrittoRegioneLombardia
      notaOperatore
      documentiLavoratore
    }
  }
  `,
  'estraiDatiOperatore',
];


export const EstraiRecensioni = [
  '',
  `query EstraiRecensioniMultiple ($idRecensioni:[Int]){
    EstraiRecensioniMultiple(idRecensioni:$idRecensioni)
      {
          id_rich_serv_rec
          qt_media_singola_recensione
          js_dati_recensione
          js_dati_recensione_wemi
          ts_creazione
          cd_stato_rec
          cd_stato_rec_wemi
      }
  }`,
  'EstraiRecensioniMultiple',
];

export const EstraiFileLavoratore = [
  '',
  `query estraiFileLavoratore ($idUtenteLav: Int!, $idAllegato: Int!){
    estraiFileLavoratore(idUtenteLav: $idUtenteLav, idAllegato: $idAllegato)
  }`,
  'estraiFileLavoratore',
];

const aggiornaStepsLavoratoreTCBQueryName = 'aggiornaStepsLavoratoreTCB';

export const aggiornaStepsLavoratoreTCBQuery = [
  '',
  `mutation ${aggiornaStepsLavoratoreTCBQueryName}($idUtenteLav: Int!, $steps: DatiStepsLavoratoreTCB!) {
    ${aggiornaStepsLavoratoreTCBQueryName}(idUtenteLav: $idUtenteLav, steps: $steps) {
      cd_stato_pag_anagrafica,
      cd_stato_pag_stato_occup,
      cd_stato_pag_istruzione,
      cd_stato_pag_esp_lav,
      cd_stato_pag_dati_pers,
      cd_stato_pag_comp_tata,
      cd_stato_pag_disp_tata,
      cd_stato_pag_comp_colf,
      cd_stato_pag_disp_colf,
      cd_stato_pag_comp_badante,
      cd_stato_pag_disp_badante,
      cd_stato_pag_candidatura,
      fg_candidatura_tata,
      fg_candidatura_colf,
      fg_candidatura_badante
    }
  }`,
  aggiornaStepsLavoratoreTCBQueryName,
];

const estraiStepsLavoratoreTCBQueryName = 'estraiStepsLavoratoreTCB';

export const estraiStepsLavoratoreTCBQuery = [
  '',
  `query ${estraiStepsLavoratoreTCBQueryName}($idUtenteLav: Int!) {
    ${estraiStepsLavoratoreTCBQueryName}(idUtenteLav: $idUtenteLav) {
      cd_stato_pag_anagrafica,
      cd_stato_pag_stato_occup,
      cd_stato_pag_istruzione,
      cd_stato_pag_esp_lav,
      cd_stato_pag_dati_pers,
      cd_stato_pag_comp_tata,
      cd_stato_pag_disp_tata,
      cd_stato_pag_comp_colf,
      cd_stato_pag_disp_colf,
      cd_stato_pag_comp_badante,
      cd_stato_pag_esp_badante,
      cd_stato_pag_disp_badante,
      cd_stato_pag_candidatura,
    }
  }`,
  estraiStepsLavoratoreTCBQueryName,
];
