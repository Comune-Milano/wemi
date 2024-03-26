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

const estraiLivelliContrattualiQueryName = 'estraiConfigurazioniLivelliContrattuali';
const estraiAttributesQueryName = 'EstraiAttributiDomandaTCB';

export const getRiepilogoData = [
  '',
  `query ($idServizio: Int!, $idRichiestaTcb: Int!, $arrayConfig: [Int]!){
      livelliContrattuali: ${estraiLivelliContrattualiQueryName}(
        idServizio: $idServizio
      ) {
        nr_anno_rif
        dominioTcb
        cd_tipo_orario_lavoro
        cd_categoria_contrattuale
        im_importo_contributo
        paga_minima_contrattuale
        im_importo_indennita
        LivelloContrattuale{
          idServizio
          cdLivelloContrattuale
          livpg
          txLivelloBreve
          txLivelloLungo
        }
      }
      attributes: ${estraiAttributesQueryName}(
        idRichiestaTcb: $idRichiestaTcb,
        arrayConfig: $arrayConfig
      ) {
        cd_attributo,
        cd_val_attributo,
        tx_val,
        dt_val,
        tx_nota,
        tx_nota_op,
        nr_val,
        fg_val,
        fg_mansione_svolta,
        tl_valore_testuale
      }
    }`,
];