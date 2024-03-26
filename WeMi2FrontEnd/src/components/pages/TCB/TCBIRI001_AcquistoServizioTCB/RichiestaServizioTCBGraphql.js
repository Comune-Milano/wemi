/** @format */

const getLivelliContrattualiQueryName = 'estraiConfigurazioniLivelliContrattuali';
const getModalitaAssunzioneQueryName = 'ModalitaAssunzioneByServizioTCB';
const getTipologiaOrarioQueryName = 'TipologiaOrarioByServizioTCB';
const getServiziTCBQueryName = 'tipoServizioTcbAll';

export const getRichiestaServizioData = [
  '',
  `query ($idServizio: Int!,) {
    livelliContrattuali: ${getLivelliContrattualiQueryName} (
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
    modalitaAssunzione: ${getModalitaAssunzioneQueryName} (
      idServizio: $idServizio
    ) {
      tl_valore_testuale
      cd_dominio_tcb
    }
    tipologiaOrario: ${getTipologiaOrarioQueryName} (
      idServizio: $idServizio 
    ) {
      tl_valore_testuale
      cd_dominio_tcb
    }
    serviziTCB: ${getServiziTCBQueryName} {
      ty_dominio_tcb
      tl_valore_testuale
      cd_dominio_tcb
      pg_visualizzazione
    }
  }`,
]