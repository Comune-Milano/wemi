export const estraiAttributiDomanda = [
  '',
  `query EstraiAttributiDomandaTCB($idRichiestaTcb: Int!, $arrayConfig: [Int]) {
    EstraiAttributiDomandaTCB(
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
  'EstraiAttributiDomandaTCB',
];

export const modalitaAssunzioneTCB = (idServizio) => [
  '',
  `{
      ModalitaAssunzioneByServizioTCB (idServizio: ${idServizio}) {
        tl_valore_testuale
        cd_dominio_tcb
      }
    }`,
];

export const tipoOrarioTCB = (idServizio) => [
  '',
  `{
      TipologiaOrarioByServizioTCB (idServizio: ${idServizio}) {
        tl_valore_testuale
        cd_dominio_tcb
      }
    }`,
];

export const estraiLivelliContrattuali = (idServizio) => [
  '',
  `{
      estraiConfigurazioniLivelliContrattuali(idServizio: ${idServizio}) {
        nr_anno_rif
        dominioTcb
        cd_tipo_orario_lavoro
        cd_categoria_contrattuale
        im_importo_contributo
        paga_minima_contrattuale
        im_importo_indennita
        im_importo_indennita_tata
        im_importo_indennita_badante
        LivelloContrattuale{
          idServizio
          cdLivelloContrattuale
          livpg
          txLivelloBreve
          txLivelloLungo
        }
      }
    }`,
];