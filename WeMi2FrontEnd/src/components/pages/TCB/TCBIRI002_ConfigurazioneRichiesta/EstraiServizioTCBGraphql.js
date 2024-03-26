/** @format */

export const serviziTCB = [
  '',
  `{
    tipoServizioTcbAll {
      ty_dominio_tcb
      tl_valore_testuale
      cd_dominio_tcb
      pg_visualizzazione
    }
  }`,
  'tipoServizioTcbAll'
];

export const datiStepTCB = [
  '',
  `query EstraiDatiStepTCB(
    $idRichiestaTcb: Int!
    ) {
    EstraiDatiStepTCB(idRichiestaTcb: $idRichiestaTcb) {
      cd_stato_pag_beneficiario
      cd_stato_pag_mansioni
      cd_stato_pag_casa
      cd_stato_pag_animali
      cd_stato_pag_disponibilita
      cd_stato_pag_preferenzelav
      cd_stato_pag_sedelavoro 
      idUtenteRiferimento
      statoRichiesta
    }
  }`,
  'EstraiDatiStepTCB'
];

export const tipoOrarioTCB = [
  '',
  `{
      tipoOrarioLavoroAll {
      ty_dominio_tcb
      tl_valore_testuale
      cd_dominio_tcb
      pg_visualizzazione
    }
  }`,
  'tipoOrarioLavoroAll',
];
