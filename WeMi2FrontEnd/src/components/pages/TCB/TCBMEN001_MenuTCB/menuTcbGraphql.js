/** @format */

export const serviziTCB = () => [
  '',
  `{
    tipoServizioTcbAll {
  ty_dominio_tcb
      tl_valore_testuale
      cd_dominio_tcb
      pg_visualizzazione
    }
  }`,
];

export const tipoOrarioTCB = () => [
    '',
    `{
        tipoOrarioLavoroAll {
    ty_dominio_tcb
        tl_valore_testuale
        cd_dominio_tcb
        pg_visualizzazione
      }
    }`,
  ];


  
export const estraiLivelliContrattuali = (idServizio)=> [
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

export const estraiStatoCandidatura = [
  '',
  `query estraiStatoCandidatura($idUtenteLav: Int!){
    estraiStatoCandidatura(idUtenteLav: $idUtenteLav){
    cd_ultimo_stato_offerta
    }
  }`,
  'estraiStatoCandidatura',
];