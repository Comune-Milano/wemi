
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

export const inizializzaUtenteLav = [
  '',
  `mutation inizializzaUtenteLav {
    inizializzaUtenteLav
  }`,
  'inizializzaUtenteLav',
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
      fg_candidatura_tata,
      fg_candidatura_colf,
      fg_candidatura_badante,
      isLavoratoreAssociato
    }
  }`,
  estraiStepsLavoratoreTCBQueryName,
];
