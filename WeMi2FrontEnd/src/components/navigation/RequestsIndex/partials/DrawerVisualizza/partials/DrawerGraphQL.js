import { isNullOrUndefined } from "util";

/** @format */

const estraiLivelliContrattualiQueryName = 'estraiConfigurazioniLivelliContrattuali';
const estraiAttributesQueryName = 'EstraiAttributiDomandaTCB';

export const getRiepilogoData = [
  '',
  `query ($idServizio: Int!, $idRichiestaTcb: Int!, $arrayConfig: [Int]!, $annoRiferimento: Int){
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


export const AnnullaRichiestaTCB = [
  '',
  `mutation AnnullaRichiestaTCB ($input:AnnullaRichiestaInput!) {
    AnnullaRichiestaTCB (
    input: $input
    )
  }`
];
export const InviaAnnullaRichiestaTCB = [
  '',
  `mutation InviaAnnullaRichiestaTCB ($input:AnnullaRichiestaInput!) {
    InviaAnnullaRichiestaTCB (
    input: $input
    )
  }`
];
export const EstraiDettaglioAmministrativoServizioEnte = (id_servizio,id) => [
  'EstraiDettaglioAmministrativoServizioEnte',
 `{
    dFasciaOrariaAll{
      id_periodo
      tl_valore_testuale
    }
    EstraiSostegniEconomici{
      idSostegno
      txSostegno
    }
    municipioAll{
      idMunicipio
      nmMunicipio
    }
    mansioneAll{
      idMansione
      txTitoloMansione
    }
    mansioneByService(id_servizio_ente:${id_servizio}){
      idMansione
      txTitoloMansione
     }
    destinatari{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
    destinatariServizio(id_servizio:${id_servizio}){
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
    EstraiServizioErogatoEnte004(id_ente:${id}){
      cd_stato_dati_servizio_ente
      id_servizio_ente,
      id_servizio_riferimento

    }
    entePK(id_ente:${id}){
      cd_stato_ente
      datiEnte{
        sedeEnte{
          id_sede
          js_sede
        }
      }
    }

    contenutoByTy(ty_contenuto:18){
      tl_testo_1
      id_contenuto
    }
    EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente:${id_servizio}){
      js_note_adminwemi_su_servizio
      tl_descrizione_serv_erog_ente
      id_servizio_ente
      qt_min_pers
      qt_max_pers
    sedeErogazione{
      js_sede
      id_sede
    }
    
    dt_inizio_erog_serv
    dt_fine_erog_serv
    tx_altre_mansioni
    tx_altra_sede
    js_dati_prezzo {
      cdTipoOffertaServizio
      cdTipoServizioErog
      dataInizio
      dataFine
      txTitoloFinanziamento
      qtMinimaUnita
      txNoteAlPrezzo
      listinoPrezzi {
        qtPersoneDa
        qtPersoneA
        offerta {
          qtUnitaDa
          qtUnitaA
          valore
        }
      }
    }
    qt_tempo_max_attivazione
    js_info_personale
    cd_tipo_offerta_srv
    cd_tipo_servizio_erog
    listaSostegniEconomiciSupportati{
      idSostegno
      txSostegno
    }
    listaMunicipiServiti{
      idMunicipio
      nmMunicipio
    }
    listaMansioniSvolte{
      idMansione
      txTitoloMansione
    }
    listaPeriodiErogazione{
      id_periodo
      tl_valore_testuale
    }
    service{
      txTitoloServizio
      tl_testo_aggettivo
      prezzo {
        cd_unita_prezzo
        tl_testo_sostantivo
        tl_testo_aggettivo
      }
id_servizio
      categoriaAccreditamentoServizio{
        txTitoloCategoria
      }
      
    }
      ente{
        nm_ente
        id_ente
        nm_ente_completo
        datiEnte{
          note_per_cittadino
          js_primo_contatto
          js_altre_info
          js_note_adminwemi
          js_referente
        }
      }
    listaDestinatariPrimoLivello{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        idDestinatarioPrimoLivello
        txDestinatario
      }
    }
    listaDestinatariSecondoLivello{
      idDestinatario
      txDestinatario
      idDestinatarioPrimoLivello
    }
    }
  }`
];

export const conversazioneByIdRichiesta = idRichiesta => [
  'messaggiUtenteEnte',
` 
{ 
  retrieveMessages(id_richiesta_servizio:${idRichiesta}){
    id_richiesta_servizio_ente
    tx_testo_messaggio 
    fg_msg_ente
    id_utente_autore_msg
    ts_creazione
  }
}
      
    `
];

export const aggiungiAlCarrello = (request) =>
   [
  'inserimentoCarello',
` 
mutation{
  aggiungiAlCarrello(input:{
   id_utente: 2,
   idRichiestaEnte: ${request.id_richiesta_servizio_ente}
 }){
 id_interno_transazione
 js_dati_fatturazione
 js_dati_pagamento
 ts_creazione
 storiaStati{
   id_interno_trans_pag
   ts_variazione_stato
   cd_stato_pagamento
 }
 
}
 
 }
      
    `
];

export const estraiCarrello = idUtente => 
   [
  'estraiCarrello',
` 
{
  EstraiCarrello(idUtente:${idUtente}){
    id_richiesta_servizio_ente
    id_richiesta_servizio_base
    id_interno_trans_pag
    recensione{
      id_rich_serv_rec
      storiaStati{
        id_rich_serv_rec
      }
    }
    datiPagamento{
      id_interno_transazione
      js_dati_fatturazione
      storiaStati{
        id_interno_trans_pag
        ts_variazione_stato
        cd_stato_pagamento
        id_utente
      }
    }
    servizioEnte{
      id_servizio_ente
      im_prezzo_minimo_offerta_calc
      media_recensioni
      numeroRecensioni
      ente{
        nm_ente
        datiEnte{
          media{
            oj_media
          }
        }
      }
      service{
        txDescrizioneServizio
      }
    }
    storiaStati{
      id_richiesta_servizio_ente
      ts_variazione_stato
    }
  }
}
      
    `
];




export const estraiRichiestaEnte = idRichiestaEnte => 
   [
  'estraiRichiestaEnte',
` 
{
  EstraiRichiestaEnte(idRichiestaEnte:${idRichiestaEnte}){
    id_richiesta_servizio_ente
    id_richiesta_servizio_base
    id_servizio_erogato_ente
    id_interno_trans_pag
    ptx_username
    im_costo_totale_calcolato
    im_costo_totale_ente
    id_utente_richiedente
    js_dati_lavoratore
    dt_periodo_proposto_dal
    dt_periodo_proposto_al
    cd_fascia_oraria_proposta
    tx_note_ente
    ts_scadenza_acquisto
    ts_creazione
    im_costo_totale_calcolato
    
    datiPagamento {
      id_interno_transazione
      js_dati_fatturazione
      js_dati_pagamento
      ts_creazione
      
    }
    recensione {
      qt_media_singola_recensione
      js_dati_recensione
      js_dati_recensione_wemi
      
    }
    servizioEnte {
      service{
        txTitoloServizio
      }
      id_servizio_ente
      id_servizio_riferimento
      id_ente_erogatore
      tl_descrizione_serv_erog_ente
      listaMansioniSvolte{
        txTitoloMansione
      }
      ente {
        nm_ente
      }
    }
    

    richiestaServizioBase {
      js_dati_richiesta
      ts_creazione
      idRichiestaBase
      dt_periodo_richiesto_dal
      dt_periodo_richiesto_al
      ts_creazione_inoltro
      serviceName
      municipioName
          storiaStati {
            id_richiesta_servizio
          ts_variazione_stato
          cd_stato_richiesta_servizio
          id_utente
          }
          costo
          user {
            ptx_username
            id_utente
          }
          

        
    

   
  
  }
  }  
}
      
    `
];

